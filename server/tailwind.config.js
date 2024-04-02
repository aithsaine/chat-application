import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                main: {
                    100: "rgb(0, 18, 37)",
                    200: "rgb(0, 28, 47)",
                    400: "rgb(0, 38, 57)",
                    500: "rgb(0, 48, 67)",
                    600: "rgb(0, 58, 77)",
                    700: "rgb(0, 68, 87)",
                    800: "rgb(0, 78, 97)",
                }


            }

        },
    },

    plugins: [forms],
};
