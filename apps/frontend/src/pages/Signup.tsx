import { useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BACKEND_URL } from "@/config";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // API function
  async function signup({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/signup`,
      {
        username,
        password,
      }
    );

    return response.data;
  }

  // React Query mutation
  const mutation = useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      console.log("Signup successful:", data);

      // Go to signin after successful signup
      navigate("/signin");
    },

    onError: (error: any) => {
      console.error("SIGNUP ERROR:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);

        alert(
          error.response.data?.message ||
            "Unable to create account"
        );
      } else {
        alert("Unable to connect to the server");
      }
    },
  });

  function handleSignup() {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    mutation.mutate({
      username,
      password,
    });
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-black items-center px-16 lg:px-24">
        <div className="max-w-xl">

          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Sparkles className="h-4 w-4" />
            AI-powered video creation
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
            Create something
            <br />

            <span className="text-gray-500">
              extraordinary.
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-500 max-w-md">
            Turn your ideas into cinematic videos with the power
            of AI.
          </p>

        </div>
      </div>


      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 bg-[#dff5e7] flex items-center justify-center px-6 py-12">

        <Card className="w-full max-w-md border-black/10 bg-white/75 backdrop-blur-xl shadow-2xl rounded-3xl">

          <CardHeader className="space-y-5 pb-4">

            {/* LOGO */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>

                <span className="font-semibold text-black">
                  Higgsfield
                </span>

              </div>

              <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60">
                Beta
              </span>

            </div>


            {/* HEADING */}
            <div className="space-y-2 pt-3">

              <h2 className="text-3xl font-bold tracking-tight text-black">
                Create your account
              </h2>

              <p className="text-sm text-black/50">
                Start creating cinematic AI videos today.
              </p>

            </div>

          </CardHeader>


          <CardContent className="space-y-5">

            {/* USERNAME */}
            <div className="space-y-2">

              <label className="text-sm font-medium text-black">
                Username
              </label>

              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="
                  h-12
                  rounded-xl
                  border-black/15
                  bg-white/70
                  text-black
                  placeholder:text-black/35
                  focus-visible:ring-2
                  focus-visible:ring-black
                "
              />

            </div>


            {/* PASSWORD */}
            <div className="space-y-2">

              <div className="flex items-center justify-between">

                <label className="text-sm font-medium text-black">
                  Password
                </label>

                <span className="text-xs text-black/40">
                  Minimum 8 characters
                </span>

              </div>


              <div className="relative">

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="
                    h-12
                    rounded-xl
                    border-black/15
                    bg-white/70
                    pr-12
                    text-black
                    placeholder:text-black/35
                    focus-visible:ring-2
                    focus-visible:ring-black
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-black/40
                    hover:text-black
                    transition
                  "
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>

            </div>


            {/* SIGNUP BUTTON */}
            <Button
              onClick={handleSignup}
              disabled={mutation.isPending}
              className="
                h-12
                w-full
                rounded-xl
                bg-black
                text-white
                font-semibold
                shadow-lg
                shadow-black/10
                transition-all
                hover:bg-black/85
                hover:-translate-y-0.5
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {mutation.isPending
                ? "Creating account..."
                : "Create account"}
            </Button>


            {/* DIVIDER */}
            <div className="flex items-center gap-3">

              <Separator className="flex-1 bg-black/10" />

              <span className="text-xs text-black/35">
                OR
              </span>

              <Separator className="flex-1 bg-black/10" />

            </div>


            {/* GOOGLE */}
            <Button
              variant="outline"
              className="
                h-12
                w-full
                rounded-xl
                border-black/15
                bg-white/60
                text-black
                hover:bg-white
              "
            >
              Continue with Google
            </Button>


            {/* SIGN IN */}
            <p className="text-center text-sm text-black/50 pt-2">

              Already have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="font-semibold text-black hover:underline"
              >
                Sign in
              </button>

            </p>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}