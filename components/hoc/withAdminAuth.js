import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAdminAuth(WrappedComponent) {
  return function WithAdminAuth(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!session || session.user.role !== "admin") {
        router.replace("/admin/login");
      }
    }, [session, status]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (!session || session.user.role !== "admin") {
      return null; // Or a custom unauthorized component
    }

    // If we made it here, the user is authenticated and is an admin
    return <WrappedComponent {...props} />;
  };
}
