if (!customElements.get('instagram')) {
  customElements.define(
    'instagram',
    class Instagram extends HTMLElement {
      constructor() {
        super();
        this.token = this.dataset.token;
        this.limit = Number(this.dataset.limit);
        this.template = document.querySelector('.instagram-feed-template').innerHTML;
      }

      connectedCallback() {
        this.init();
      }
      init() {
        const feed = new Instafeed({
          accessToken: this.token,
          limit: this.limit,
          template: this.template,
          target: this,
        });

        console.log(feed);

        feed.run();
      }
    }
  );
}
