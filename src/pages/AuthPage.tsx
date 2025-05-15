import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
// Determine the correct login endpoint based on account type (user or admin)
const loginEndpoint = (accountType: string) => `${apiUrl}/api/auth/${accountType}/login`;
const AuthPage: React.FC = () => {
  const [loginUniqueId, setLoginUniqueId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupOtp, setSignupOtp] = useState('');
  const [emailForOtp, setEmailForOtp] = useState(''); // To store email after signup
  const [accountType, setAccountType] = useState('user'); // State for account type

  const [showUniqueIdPopup, setShowUniqueIdPopup] = useState(false);
  const [uniqueId, setUniqueId] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isLoginLoading, setIsLoginLoading] = useState(false); // Login loading state
  const { toast } = useToast(); // Hook for toast notifications
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    console.log('Login attempt:', { uniqueId: loginUniqueId, password: loginPassword });

    setIsLoginLoading(true); // Set login loading state to true

    // Determine the login endpoint based on the selected login type (assuming you add a state for login type)
    try {
      const response = await axios.post(loginEndpoint(accountType), { uniqueId: loginUniqueId, password: loginPassword });
      setIsLoginLoading(false); // Set login loading state to false on success
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., save token, redirect)
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); // Store the token
        // Redirect based on role (assuming role is part of the token or response data)
        // For now, redirect to homepage, you can add logic for admin later
        navigate('/');
      }
    } catch (error: any) {
      setIsLoginLoading(false); // Set login loading state to false on error
      console.error('Login failed:', error);
      toast({
 title: "Login Failed",
          description: error.response?.data?.message || "An error occurred during login.",
          variant: "destructive",
        });
    }
  };

  const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Signup attempt:', {
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword,
      confirmPassword: signupConfirmPassword,
      accountType: accountType, // Log account type
      otp: signupOtp,
    });
    event.preventDefault(); // Prevent default form submission

    setIsLoading(true); // Set loading state to true

    if (signupPassword !== signupConfirmPassword) {
        setIsLoading(false); // Set loading state to false
        toast({
 title: "Error",
            description: "Passwords do not match.",
            variant: "destructive",
          });
        console.error("Passwords do not match");
        // Show error to user
        return; // Prevent signup if passwords don't match
    }
    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        name: signupName,
        email: signupEmail,
        phoneNumber: signupPhone, // Ensure backend expects phoneNumber
        password: signupPassword,
        confirmPassword: signupConfirmPassword, // Backend might not need this, but good for frontend validation
        role: accountType, // Include account type in signup data
      });
      setIsLoading(false); // Set loading state to false on success
      console.log('Signup successful:', response.data);

      // Assuming the backend returns the uniqueId in the response data
      if (response.data && response.data.uniqueId) {
        setUniqueId(response.data.uniqueId);
        setShowUniqueIdPopup(true);
        setEmailForOtp(signupEmail); // Store email for OTP
      }

    } catch (error: any) { // Use any for error type
      setIsLoading(false); // Set loading state to false on error
      console.error('Signup failed:', error);
       toast({
 title: "Error",
          description: error.response?.data?.message || "An error occurred during signup.", // Display backend error message or a default one
          variant: "destructive",
        });
      // Handle signup error
      // You would typically use a toast notification here
    }
  };

  const handleSendOtp = async () => {
    console.log('Verify email attempt for:', signupEmail);
    try {
        // Assuming the user has already submitted the initial signup form successfully
        if (!signupEmail) {
            toast({
                title: "Error",
                description: "Please complete the initial signup step first.",
                variant: "destructive",
            });
            return;
        }
        await axios.post(`${apiUrl}/api/auth/send-otp`, { email: signupEmail });
        toast({
            title: "OTP Sent",
            description: "An OTP has been sent to your email address.",
        });
    } catch (error: any) {
        console.error("Failed to send OTP:", error);
        toast({
 title: "Error",
            description: error.response?.data?.message || "Failed to send OTP.",
            variant: "destructive",
        });
    }
  };

  const handleVerifyOtp = async () => {
    console.log('Verifying OTP for:', emailForOtp, 'with OTP:', signupOtp);
    try {
        await axios.post(`${apiUrl}/api/auth/verify-otp`, { email: emailForOtp, otp: signupOtp });
        toast({
            title: "Email Verified",
            description: "Your email has been successfully verified.",
        });
    } catch (error) {
        console.error("Failed to send OTP:", error);
    }
  };

  useEffect(() => {
    const keyframes = `
      @keyframes moveBackground {
        0% { background-position: 0 0; }
        100% { background-position: 100% 100%; }
      }
    `;
    // Ensure stylesheet exists before inserting rules
    if (document.styleSheets.length > 0) {
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
  }, []); // Empty dependency array ensures this runs only once after mount
  return (
    <div
      className="flex justify-center items-center min-h-screen p-4 sm:p-8 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900" // Modern gradient background
    >
      {/* Dynamic Background Effect (subtle) */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px', animation: 'moveBackground 30s linear infinite' }}
      ></div>

      <Card className="w-full max-w-md shadow-2xl border-none bg-white/90 backdrop-blur-lg text-gray-800 z-20 transform transition-all duration-300 hover:scale-105"> {/* Added z-20, backdrop blur, and hover effect */}
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold text-teal-600 tracking-wide">Welcome</CardTitle> {/* Enhanced title style */}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full space-y-4"> {/* Added space below tabs */}
            <TabsList className="grid w-full grid-cols-2">
              {/* Tabs with improved colors */}
              <TabsTrigger value="login" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-colors duration-300">Login</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-colors duration-300">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              {/* Login Form */}
              <form className="grid gap-6 p-6 rounded-lg shadow-xl bg-gray-200/80" onSubmit={(e) => { e.preventDefault(); handleLoginSubmit(e); }}> {/* Enhanced container styling */}
                <div className="grid gap-2 mb-4 bg-gray-100/80 p-4 rounded-md shadow-inner"> {/* Added styling */}
 <Label htmlFor="login-unique-id">Unique ID</Label>
                 <Input
                    id="login-unique-id"
                    placeholder="Your Unique ID" 
                    value={loginUniqueId}
                    onChange={(e) => setLoginUniqueId(e.target.value)}
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500" // Changed focus color
                    required
 style={{ color: 'white' }} // Set text color to white
                  />
                </div>
                <div className="grid gap-2 mb-4 bg-gray-100/80 p-4 rounded-md shadow-inner"> {/* Added styling */}
 <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Your Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500" // Changed focus color
                    required
 style={{ color: 'white' }} // Set text color to white
                  />
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" disabled={isLoginLoading}> {/* Enhanced button style */}
                {isLoginLoading && (

                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 )}
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              {/* Signup Form */}
              <form className="grid gap-6 p-6 rounded-lg shadow-xl bg-gray-200/80" onSubmit={handleSignupSubmit}> {/* Enhanced container styling */}
                {/* Name Field */} {/* Added styling */}
                 <div className="grid gap-2 bg-white/70 p-4 rounded-md shadow-inner"> {/* Added styling */}
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                        id="signup-name"
                        placeholder="Your Name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500" // Changed focus color
 style={{ color: 'white' }} // Set text color to white
                    />
                </div>
                {/* Email Field */} {/* Added styling */}
                <div className="grid gap-2 mb-4">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                        id="signup-email"
                        type="email"
                        placeholder="Your Email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500" // Changed focus color
 style={{ color: 'white' }} // Set text color to white
                    />
                </div>
                {/* Phone Number Field */} {/* Added styling */}
                 <div className="grid gap-2 mb-4">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="Your Phone Number"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        required
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500" // Changed focus color
 style={{ color: 'white' }} // Set text color to white
                    />
                </div>
                {/* Password Field */} {/* Added styling */}
                <div className="grid gap-2 mb-4">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500" // Changed focus color
 style={{ color: 'white' }} // Set text color to white
                  />
                </div>
                {/* Confirm Password Field */} {/* Added styling */}
                <div className="grid gap-2 mb-4">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="Confirm Your Password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    required
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500" // Changed focus color
 style={{ color: 'white' }} // Set text color to white
                  />
                </div>
                {/* Account Type Selection */} {/* Added styling */}
                <div className="grid gap-2 mb-4">
                    <Label>Account Type</Label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="account-type-user"
                                value="user"
                                checked={accountType === 'user'}
                                onChange={() => setAccountType('user')}
                                className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500" // Changed radio button color
                            />
                            <Label htmlFor="account-type-user">User</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="account-type-admin"
                                value="admin"
                                checked={accountType === 'admin'}
                                onChange={() => setAccountType('admin')}
                                className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500" // Changed radio button color
                            />
                            <Label htmlFor="account-type-admin">Admin</Label>
                        </div>
                    </div>
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" disabled={isLoading}> {/* Enhanced button style */}
                  Signup
                </Button>
              </form>


              {/* Conditionally rendered OTP section after signup form */}
              {showUniqueIdPopup && (
               <div className="grid gap-4 mt-4"> {/* Adjusted outer div for consistency */}
                    <Label htmlFor="signup-otp" className='text-gray-800'>OTP</Label>
                     <div className="flex gap-2 mb-4"> {/* Added mb-4 */}
                        <Input
                            id="signup-otp"
                            placeholder="Enter OTP"
                             value={signupOtp}
                            onChange={(e) => setSignupOtp(e.target.value)}
                            required
                            className="flex-grow shadow-sm focus:ring-teal-500 focus:border-teal-500" // Changed focus color
 style={{ color: 'white' }} // Set text color to white
                        />
                         <Button type="button" onClick={handleSendOtp} className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-300">Send OTP</Button> {/* Button to send OTP */}
                    </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {/* Unique ID Pop-up */}
      <Dialog open={showUniqueIdPopup} onOpenChange={setShowUniqueIdPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Unique ID</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Please save your unique ID. You will need it to log in.
          </DialogDescription>
          <div className="p-4 bg-teal-50 rounded-md text-center font-mono text-lg break-all text-teal-800 border border-teal-200"> {/* Changed color to teal */}
            {uniqueId}
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthPage;