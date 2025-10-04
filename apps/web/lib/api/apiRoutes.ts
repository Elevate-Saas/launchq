export const apiRoutes = {
  auth: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
    refreshToken: "/auth/refresh",
    signOut: "/auth/sign-out",
    changePassword: "/auth/change-password",
    getAuthUser: "/auth/user",
  },
  organization: {
    createOrganization: "/organization/create",
    getOrganization: "/organization/",
    addMember: "/organization/add-member",
    resendInvite: "/organization/resend-invite",
    getInvites: "/organization/invites",
    acceptInvite: "/organization/accept-invite",
  },
};
