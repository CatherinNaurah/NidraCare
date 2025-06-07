import Presenter from './presenter';
import * as API from '../../../data/api';
import LoginBg from '../../../assets/images/login_bg.png';
import Logo from '../../../assets/images/nidracare.png';
import gsap from 'gsap';
import { putAccessToken, putUserInfo } from '../../../utils/auth';

export default class Page {
  #presenter = null;

  async render() {
    return `
      <section class="flex flex-col md:flex-row min-h-screen">
        <div class="relative w-full md:w-1/2 min-h-[480px]">
          <img src="${LoginBg}" alt="Hero Login" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 z-10"></div>
          <div class="relative z-20 flex items-center justify-center h-full px-8 py-10">
            <div class="text-white max-w-md">
              <div id="logo-login" class="h-[100px] w-[100px] bg-white p-2 overflow-hidden rounded-xl mb-2">
                <img src="${Logo}" class="h-full object-contain" />
              </div>
              <h2 id="title-login" class="text-[48px] font-extrabold leading-tight mb-3">NidraCare</h2>
              <p id="desc-login" class="text-[20px] leading-relaxed">
                Tidur nyenyak, hidup pun jadi lebih teratur<br />
                Deteksi gangguan tidurmu sekarang dan mulai<br />
                perubahan positif hari ini
              </p>
            </div>
          </div>
        </div>

        <section class="md:w-1/2 flex items-center justify-center p-8" style="min-height: 480px">
          <form id="login-form" autocomplete="off" class="p-8 w-full max-w-md">
            <div class="mb-6 text-left">
              <h2 class="text-2xl font-bold text-black">Masuk ke Akun Anda</h2>
              <p class="text-black/40 mt-2">Selamat datang kembali di <strong>NidraCare</strong> — silakan masuk untuk melanjutkan aktivitas Anda.</p>
              <div class="h-[1px] w-[75%] bg-black/20 block mt-4"></div>
            </div>

            <label class="block text-sm font-normal text-black mb-1" for="username">Username</label>
            <input id="username" type="text" name="username" placeholder="Masukkan username Anda" 
              class="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 text-sm placeholder-gray-400 outline:none"/>

            <label class="block text-sm font-normal text-black mb-1" for="password">Password</label>
            <input id="password" type="password" name="password" placeholder="Masukkan password Anda" 
              class="w-full mb-6 px-4 py-3 rounded-xl border border-gray-300 text-sm placeholder-gray-400 outline:none"/>

            <button id="login-button" type="submit" 
              class="cursor-pointer w-full bg-[#0a1446] text-white font-semibold px-4 py-3 rounded-xl hover:bg-[#0c1a5a] transition">
              Masuk
            </button>

            <p class="text-center text-sm mt-4 text-black">
              Belum punya akun?
              <a href="#/register" class="font-semibold text-[#0a1446] hover:underline">Daftar sekarang</a>
            </p>
          </form>
        </section>
      </section>
    `;
  }

async afterRender() {
  const authModel = {
    putAccessToken: putAccessToken,
    putUserInfo: putUserInfo,
  };

  this.#presenter = new Presenter({
    view: this,
    model: API,
    authModel, 
  });

  this.#setupForm();

  const tl = gsap.timeline();
  tl.from("#logo-login", {
    opacity: 0,
    y: 60,
    ease: "power2.out"
  }).from("#title-login", {
    opacity: 0,
    y: 40,
    ease: "power2.out"
  }).from("#desc-login", {
    opacity: 0,
    y: 20,
    ease: "power2.out"
  }).from("#login-form", {
    opacity: 0,
    x: 40,
    ease: "power2.out"
  });
}

  #setupForm() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
      };

      await this.#presenter.getLogin(data);
    });
  }
  loginSuccessfully(message, user) {
    console.log(message);
    location.hash = '/home'; 
  }
  loginFailed(message) {
    alert(message);
  }
  showSubmitLoadingButton() {
    document.getElementById('login-button').innerHTML = `
      <i class="fas fa-spinner fa-spin mr-2"></i> Memproses...
    `;
    document.getElementById('login-button').disabled = true;
  }
  hideSubmitLoadingButton() {
    document.getElementById('login-button').innerHTML = 'Masuk';
    document.getElementById('login-button').disabled = false;
  }
}