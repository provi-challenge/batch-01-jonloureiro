module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#2647d7',
          neutral: '#1f2937',
          'base-100': '#fff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
          '--rounded-btn': '0.375rem',
          '--btn-text-case': 'normal-case',
          '--animation-btn': '0s',
        },
      },
    ],
  },
};
