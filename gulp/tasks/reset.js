import del from 'del';

export const reset = () => {
    return del(global.app.path.clean);
};