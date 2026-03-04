import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type UserProfile = {
    name : Text;
    isNormalMode : Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public shared ({ caller }) func setProfile(name : Text, isNormalMode : Bool) : async () {
    let profile : UserProfile = {
      name;
      isNormalMode;
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getProfile() : async UserProfile {
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("Profile does not exist") };
      case (?profile) { profile };
    };
  };
};
