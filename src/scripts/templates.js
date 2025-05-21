export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <div class="flex justify-between items-center h-full w-full container mx-auto">
      <div class="flex flex-wrap gap-4">
        <div><a id="login-button" href="#/login">Login</a></div>
        <div><a id="register-button" href="#/register">Register</a></div>
      </div>
    </div>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <div class="flex justify-between items-center h-full w-full container mx-auto">
      <div class="flex flex-wrap gap-4">
        <div><a href="#/">Home</a></div>
      </div>
    </div>
  `;
}
