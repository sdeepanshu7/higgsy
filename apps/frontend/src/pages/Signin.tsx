import { useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function signin() {
    console.log("Username:", username);
    console.log("Password:", password);

    // Backend authentication will be added here later
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
            Welcome
            <br />
            <span className="text-gray-500">
              back.
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-500 max-w-md">
            Continue creating cinematic videos with the power of AI.
          </p>

        </div>
      </div>


      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 bg-[#C8F7DC] flex items-center justify-center px-6 py-12">

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
                Welcome back
              </h2>

              <p className="text-sm text-black/50">
                Sign in to continue creating cinematic AI videos.
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
                onChange={(e) => setUsername(e.target.value)}
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

                <button
                  type="button"
                  className="text-xs text-black/40 hover:text-black transition"
                >
                  Forgot password?
                </button>

              </div>


              <div className="relative">

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onClick={() => setShowPassword(!showPassword)}
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


            {/* SIGN IN */}
            <Button
              onClick={signin}
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
              "
            >
              Sign in
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


            {/* SIGN UP */}
            <p className="text-center text-sm text-black/50 pt-2">

              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-semibold text-black hover:underline"
              >
                Create account
              </button>

            </p>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}