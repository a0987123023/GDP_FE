/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px'
      },
      colors: {
        primary: {
          900: '#04327a',
          800: '#307ac7',
          700: '#409eff',
          600: '#ecf5ff',
          500: '#f2f6fc'
        },
        warning: {
          900: '#e6a23c',
          800: '#f9b452',
          700: '#faecd8'
        }
      }
    }
  },
  plugins: [
    {
      sass: {
        '.el-button': {
          'background-color': 'var(--el-button-bg-color,var(--el-color-white))'
        }
      }
    }
  ]
}
