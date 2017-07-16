import { ImageUploadPage } from './app.po';

describe('image-upload App', () => {
  let page: ImageUploadPage;

  beforeEach(() => {
    page = new ImageUploadPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
