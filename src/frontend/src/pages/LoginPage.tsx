import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Shield, Truck } from "lucide-react";
import { useEffect } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const navigate = useNavigate();
  const { identity, login, isLoggingIn, isLoginSuccess } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => actor?.isCallerAdmin() ?? Promise.resolve(false),
    enabled: !!actor && !isFetching && !!identity,
  });

  useEffect(() => {
    if (isLoginSuccess && identity && isAdmin !== undefined) {
      navigate({ to: isAdmin ? "/admin" : "/dashboard" });
    }
  }, [isLoginSuccess, identity, isAdmin, navigate]);

  useEffect(() => {
    if (identity && isAdmin !== undefined) {
      navigate({ to: isAdmin ? "/admin" : "/dashboard" });
    }
  }, [identity, isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-orange mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-white text-3xl">
            BestGo Logistics
          </h1>
          <p className="text-white/60 font-body mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <Shield className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-body font-medium text-sm">
                    Secure Authentication
                  </p>
                  <p className="text-white/50 font-body text-xs mt-1">
                    We use Internet Identity for secure, passwordless
                    authentication. Your identity is fully private.
                  </p>
                </div>
              </div>

              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-body font-semibold py-6 text-base"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Authenticating...
                  </>
                ) : (
                  "Sign In Securely"
                )}
              </Button>

              <p className="text-white/40 font-body text-xs text-center">
                By signing in, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-white/40 font-body text-sm mt-6">
          Need help?{" "}
          <a href="/contact" className="text-brand-orange hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
