import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  var nextBookingId = 0;
  var nextContactId = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Status = {
    #pending;
    #confirmed;
    #inTransit;
    #delivered;
    #cancelled;
  };

  module Status {
    public func compare(status1 : Status, status2 : Status) : Order.Order {
      Nat.compare(toNat(status1), toNat(status2));
    };

    public func toNat(status : Status) : Nat {
      switch (status) {
        case (#pending) { 0 };
        case (#confirmed) { 1 };
        case (#inTransit) { 2 };
        case (#delivered) { 3 };
        case (#cancelled) { 4 };
      };
    };

    public func fromText(text : Text) : Status {
      switch (text) {
        case ("pending") { #pending };
        case ("confirmed") { #confirmed };
        case ("in-transit") { #inTransit };
        case ("delivered") { #delivered };
        case ("cancelled") { #cancelled };
        case (_) { Runtime.trap("Invalid status") };
      };
    };

    public func toText(status : Status) : Text {
      switch (status) {
        case (#pending) { "pending" };
        case (#confirmed) { "confirmed" };
        case (#inTransit) { "in-transit" };
        case (#delivered) { "delivered" };
        case (#cancelled) { "cancelled" };
      };
    };
  };

  type Booking = {
    id : Nat;
    trackingId : Text;
    customerName : Text;
    phone : Text;
    pickupLocation : Text;
    deliveryLocation : Text;
    goodsType : Text;
    weight : Text;
    preferredDate : Text;
    status : Status;
    submittedAt : Int;
    userId : ?Principal;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.id, booking2.id);
    };

    public func allStatuses() : [Text] {
      [
        Status.toText(#pending),
        Status.toText(#confirmed),
        Status.toText(#inTransit),
        Status.toText(#delivered),
        Status.toText(#cancelled),
      ];
    };
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    submittedAt : Int;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      Nat.compare(message1.id, message2.id);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  let bookings = Map.empty<Nat, Booking>();
  let bookingsByTrackingId = Map.empty<Text, Booking>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitBooking(customerName : Text, phone : Text, pickupLocation : Text, deliveryLocation : Text, goodsType : Text, weight : Text, preferredDate : Text) : async Text {
    let trackingId = "BGL-" # nextBookingId.toText();
    let booking : Booking = {
      id = nextBookingId;
      trackingId;
      customerName;
      phone;
      pickupLocation;
      deliveryLocation;
      goodsType;
      weight;
      preferredDate;
      status = #pending;
      submittedAt = Time.now();
      userId = null;
    };

    bookings.add(nextBookingId, booking);
    bookingsByTrackingId.add(trackingId, booking);
    nextBookingId += 1;

    trackingId;
  };

  public query ({ caller }) func trackShipment(trackingId : Text) : async ?{
    trackingId : Text;
    status : Text;
    pickupLocation : Text;
    deliveryLocation : Text;
    preferredDate : Text;
    customerName : Text;
  } {
    switch (bookingsByTrackingId.get(trackingId)) {
      case (null) { null };
      case (?booking) {
        ?{
          trackingId = booking.trackingId;
          status = Status.toText(booking.status);
          pickupLocation = booking.pickupLocation;
          deliveryLocation = booking.deliveryLocation;
          preferredDate = booking.preferredDate;
          customerName = booking.customerName;
        };
      };
    };
  };

  public shared ({ caller }) func submitBookingAsUser(customerName : Text, phone : Text, pickupLocation : Text, deliveryLocation : Text, goodsType : Text, weight : Text, preferredDate : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit bookings");
    };

    let trackingId = "BGL-" # nextBookingId.toText();
    let booking : Booking = {
      id = nextBookingId;
      trackingId;
      customerName;
      phone;
      pickupLocation;
      deliveryLocation;
      goodsType;
      weight;
      preferredDate;
      status = #pending;
      submittedAt = Time.now();
      userId = ?caller;
    };

    bookings.add(nextBookingId, booking);
    bookingsByTrackingId.add(trackingId, booking);
    nextBookingId += 1;

    trackingId;
  };

  public query ({ caller }) func getMyBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their bookings");
    };

    bookings.values().toArray().filter(func(b) { b.userId != null and b.userId == ?caller });
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, phone : Text, message : Text) : async Text {
    let contactMessage : ContactMessage = {
      id = nextContactId;
      name;
      email;
      phone;
      message;
      submittedAt = Time.now();
    };

    contactMessages.add(nextContactId, contactMessage);
    nextContactId += 1;

    "ok";
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray();
  };

  public shared ({ caller }) func updateBookingStatus(id : Nat, status : Text) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update bookings");
    };

    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let newStatus = Status.fromText(status);
        let updatedBooking : Booking = {
          id = booking.id;
          trackingId = booking.trackingId;
          customerName = booking.customerName;
          phone = booking.phone;
          pickupLocation = booking.pickupLocation;
          deliveryLocation = booking.deliveryLocation;
          goodsType = booking.goodsType;
          weight = booking.weight;
          preferredDate = booking.preferredDate;
          submittedAt = booking.submittedAt;
          userId = booking.userId;
          status = newStatus;
        };

        bookings.add(id, updatedBooking);
        bookingsByTrackingId.add(booking.trackingId, updatedBooking);

        "ok";
      };
    };
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    contactMessages.values().toArray();
  };
};
