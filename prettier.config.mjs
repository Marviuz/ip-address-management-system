import vercel from '@vercel/style-guide/prettier';

const prettierConfig = {
  ...vercel,
  plugins: [...vercel.plugins, 'prettier-plugin-tailwindcss'],
};

export default prettierConfig;
