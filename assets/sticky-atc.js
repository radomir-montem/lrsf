class stickyAtc extends HTMLElement {
    constructor() {
        super();
        this.productForm = document.querySelector('.product-block .product-single__form');
        this.atcButton = document.querySelector('.add-to-cart');
        this.stickyButton = this.querySelector('.sticky__button');
        this.stickySelect = this.querySelector('[name="id"]');
        this.priceElement = this.querySelector('.sticky-stc-price');
        this.variantSelect = document.querySelector('.product-single__form').querySelector('[name="id"]');
    }
    
    connectedCallback() {
        const _this = this;
        const handleIntersection = (entries, observer) => {
            entries.forEach(entrie => {
                if(window.innerWidth > 768) {
                    _this.classList.toggle('hidden', entrie.isIntersecting);
                    _this.classList.toggle('show', !entrie.isIntersecting);
                } else {
                    _this.classList.toggle('hidden', entrie.isIntersecting || window.scrollY <= 850);
                    _this.classList.toggle('show', !entrie.isIntersecting && window.scrollY > 850);
                }
            });
        }
        
        new IntersectionObserver(handleIntersection.bind(this.productForm), {rootMargin: `0px 0px -100px 0px`}).observe(this.productForm);
        this.stickyButton.addEventListener('click', this.onClickAtcButton.bind(this));
        this.stickySelect.addEventListener('change', this.onChangeStickySelect.bind(this));
        this.variantSelect.addEventListener('change', this.onChangeVariantSelect.bind(this));
    }
    
    onClickAtcButton() {
        // this.atcButton.click();
        if(window.innerWidth > 768) window.scrollTo({ top: 0, behavior: 'smooth' });
        else window.scrollTo({ top: 500, behavior: 'smooth' });
    }
    
    onChangeStickySelect () {
        const option = this.stickySelect.querySelector(`option[value="${this.stickySelect.value}"]`);
        const price = option.dataset.price;
        const options = option.textContent.trim().split(' / ');
        options.forEach((_option,index)=> {
            if(index > 0) {
                const variantWrapper = document.querySelectorAll('.variant-wrapper .variant-input-wrap')[index];
                variantWrapper.querySelectorAll('input').forEach(input => {
                    if(input.value == _option && !input.checked) {
                        input.checked = true;
                        input.dispatchEvent(new Event('change'));
                    }
                });
            }
        });
        this.variantSelect.value = this.stickySelect.value;
        this.priceElement.textContent = price;
    };

    onChangeVariantSelect () {
        const variantId = this.variantSelect.value;
        const stickyOption = this.stickySelect.querySelector(`option[value="${variantId}"]`);
        stickyOption.selected = true;
        const price = stickyOption.dataset.price;
        this.priceElement.textContent = price;
    }
}

customElements.define('sticky-atc-button', stickyAtc);