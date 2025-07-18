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
                _this.classList.toggle('hidden', entrie.isIntersecting && window.scrollY > _this.productForm.getBoundingClientRect().bottom);
                _this.classList.toggle('show', !entrie.isIntersecting && window.scrollY > _this.productForm.getBoundingClientRect().bottom);
            });
        }
        
        new IntersectionObserver(handleIntersection.bind(this.productForm), {rootMargin: `0px 0px -100px 0px`}).observe(this.productForm);
        this.stickyButton.addEventListener('click', this.onClickAtcButton.bind(this));
        this.stickySelect.addEventListener('change', this.onChangeStickySelect.bind(this));
        this.variantSelect.addEventListener('change', this.onChangeVariantSelect.bind(this));
    }
    
    onClickAtcButton() {
        this.atcButton.click();
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