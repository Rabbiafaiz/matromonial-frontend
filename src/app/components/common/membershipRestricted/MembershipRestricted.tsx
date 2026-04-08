import { useAuth } from "@/context/AuthContext";

const MembershipRestrictedComponent = () => {
    const { user } = useAuth();
  
    if (!user || user.membership !== "premium") {
      return <p>Upgrade to premium to access this feature.</p>;
    }
  
    return <div>Premium Content</div>;
  };
  

export default MembershipRestrictedComponent