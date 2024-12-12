vi.mock('@/router', () => ({ // mock de mi archivo router (no el de la libreria) 
  default: 'router',
}));

vi.mock('pinia', async (importOriginal) => { // mock pinia
  const pinia: any = await importOriginal();
  return {
    ...pinia,
    createPinia: vi.fn().mockReturnValue('pinia')
  };
});

describe('main.ts', () => {
  const vue = require('vue');
  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  const createApp = vi.fn().mockReturnValue({ // mock vue 
    use: useSpy,
    mount: mountSpy,
  });

  vue.createApp = createApp;

  test('createApp', async () => {
    await import('@/main');
    expect(vue.createApp).toHaveBeenCalled();
  });

  test('munt #app', () => {
    expect(mountSpy).toHaveBeenCalledWith('#app');
  });

  test('app.use(router)', async () => {
    expect(useSpy).toHaveBeenCalledWith('router');
  });

  test('app.use(pinia)', async () => {
    expect(useSpy).toHaveBeenCalledWith('pinia');
  });
});
