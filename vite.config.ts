import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const viteEnv = {};
Object.keys(process.env).forEach((key) => {
    if (key.startsWith(`VITE_`)) {
        viteEnv[`import.meta.env.${key}`] = process.env[key];
    }
});

// https://vitejs.dev/config/
export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        mode: 'development',
        define: viteEnv,
        plugins: [vue()],
        base: '',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@store': path.resolve(__dirname, './src/store'),
                '@components': path.resolve(__dirname, './src/components'),
                '@modules': path.resolve(__dirname, './src/modules'),
                '@pages': path.resolve(__dirname, './src/pages')
            }
        }
    });
};
