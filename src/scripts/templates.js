import Logo from '../scripts/assets/images/nidracare.png';

export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <div class="w-full relative max-w-screen-xl mx-auto">
      <div class="flex justify-between items-center w-full container mx-auto">
        <div class="w-full flex flex-wrap justify-between gap-4">
          <div id="logo-login" class="h-[90px] w-[90px] bg-white p-2 overflow-hidden rounded-xl mb-2">
            <img src="${Logo}" class="h-full object-contain" />
          </div>
          <div class="flex items-center justify-center gap-6">
            <a class="font-medium" href="#/login">Login</a>
            <a class="font-medium" href="#/register">
              <div class="cursor-pointer bg-primary p-2 rounded-xl text-white">Sign Up</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <div class="w-full relative max-w-screen-xl mx-auto">
      <div class="flex justify-between items-center w-full container mx-auto">
        <div class="w-full flex flex-wrap justify-between gap-4">
          <div id="logo-login" class="h-[80px] w-[80px] bg-white p-2 overflow-hidden rounded-xl mb-2">
            <img src="${Logo}" class="h-full object-contain" />
          </div>
          <div class="flex items-center justify-center gap-6">
            <a class="font-medium" href="#/">Beranda</a>
            <a class="font-medium" href="#/info">Info</a>
            <a class="font-medium" href="#/form">Analisa</a>
            <a class="font-medium" href="#/results">Hasil</a>
            <a id="logout-button" class="logout-button font-medium cursor-pointer" href="#/logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateFooterTemplate() {
  return `
    <footer class="max-w-7xl mx-auto px-6 py-10 bg-white text-black">
      <div class="flex flex-col md:flex-row md:justify-between gap-10">
        <div class="md:w-1/4">
          <h2 class="font-extrabold text-lg leading-6 mb-3">
            NidraCare
          </h2>
          <p class="text-base leading-6 max-w-xs">
            Let go of the day, ease your mind, and gently drift into restful sleep your peaceful night begins here.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row md:w-3/4 justify-between gap-10 sm:gap-20">
          <div>
            <h3 class="font-extrabold text-xl mb-3">
              Company
            </h3>
            <ul class="text-sm leading-6 text-gray-600 space-y-1">
              <li><a class="hover:underline" href="#">About</a></li>
              <li><a class="hover:underline" href="#">Careers</a></li>
              <li><a class="hover:underline" href="#">Press</a></li>
              <li><a class="hover:underline" href="#">Blog</a></li>
              <li><a class="hover:underline" href="#">Meet our Instructor</a></li>
              <li><a class="hover:underline" href="#">Sleep Science</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-extrabold text-xl mb-3">
              Offers
            </h3>
            <ul class="text-sm leading-6 text-gray-600 space-y-1">
              <li><a class="hover:underline" href="#">Buy a Gift</a></li>
              <li><a class="hover:underline" href="#">Redeem a Gift</a></li>
              <li><a class="hover:underline" href="#">Family Plan</a></li>
              <li><a class="hover:underline" href="#">NidraCare Health</a></li>
              <li><a class="hover:underline" href="#">NidraCare for Organizations</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-extrabold text-xl mb-3">
              Help
            </h3>
            <ul class="text-sm leading-6 text-gray-600 space-y-1">
              <li><a class="hover:underline" href="#">FAQ</a></li>
              <li><a class="hover:underline" href="#">Contact Us</a></li>
              <li><a class="hover:underline" href="#">Terms</a></li>
              <li><a class="hover:underline" href="#">Privacy Policy</a></li>
              <li><a class="hover:underline" href="#">Cookies</a></li>
              <li><a class="hover:underline" href="#">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-8 border-t border-gray-300 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center items-center gap-4">
        <div class="flex gap-4 text-gray-600 text-sm">
          <a aria-label="Instagram" class="border border-gray-600 rounded px-2 py-1 hover:bg-gray-100" href="#">
            <i class="fab fa-instagram"></i>
          </a>
          <a aria-label="YouTube" class="border border-gray-600 rounded px-2 py-1 hover:bg-gray-100" href="#">
            <i class="fab fa-youtube"></i>
          </a>
          <a aria-label="Facebook" class="border border-gray-600 rounded px-2 py-1 hover:bg-gray-100" href="#">
            <i class="fab fa-facebook-f"></i>
          </a>
        </div>
        <p class="text-sm text-gray-600">
          Copyright © ${new Date().getFullYear()} NidraCare. All rights reserved
        </p>
      </div>
    </footer>
  `;
}