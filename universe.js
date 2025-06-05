class SquareCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.current = 0;

    fetch('./universe.json')
      .then(res => res.json())
      .then(data => {
        this.data = data;
        this.render();
      });
  }

  render() {
    const style = `
      <style>
        :host {
          display: flex;
          align-items: center;
            justify-content: center;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 25%,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 1) 100%
          );
          box-shadow:
            inset 0px -9px 14.4px rgba(0, 0, 0, 0.29),
            6px 67px 78.8px rgba(0, 0, 0, 0.89);
        }

        .carousel-wrapper {
          max-width: 1350px;
          margin: 0 auto;
          position: relative;
          
        }

        .carousel-track {
          display: flex;
          transition: transform 0.6s ease;
          will-change: transform;
        }

        .carousel-item {
          flex: 0 0 90%; /* Peek effect */
          margin: 0 5%;
          max-width: 1350px;
          height: 843px;
          display: flex;
          background: #DCDDDE;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 20px;
          box-sizing: border-box;
        }

        .image-section {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-section img {
          max-height: 95%;
          object-fit: contain;
        }

        .info-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
        }

        .info-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
        }

        .title {
          font-size: 48px;
          font-family: 'Goudy Trajan', serif;
        }

        .description {
          margin: 10px 0;
          font-size: 20px;
        }

        .icon-container {
          max-height: 239px;
          width: 469px;
        }

        .icon-container img {
          max-height: 239px;
          width: auto;
          object-fit: contain;
        }

        .grid-box {
          border: 1px solid #000;
          padding: 10px;
          margin-top: 10px;
        }

        .grid-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 0;
          font-size: 20px;
        }

        .grid-inner div {
          border: 1px solid #000;
          padding: 5px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }

        .grid-inner div:last-child {
          grid-column: span 2;
        }

        .action-btn {
          padding: 14px 28px;
          color: #FFFFFF;
          background-color: #3D4F59;
          font-weight: bold;
          border: none;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: background 0.3s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), inset 17px -16px 12px rgba(0, 0, 0, 0.25);
          font-family: 'Gill Sans MT', sans-serif;
          font-size: 20px;
          font-weight: normal;
        }

        .action-btn:hover {
          background: #021822;
        }

         .nav-btn {
  width: 100px; /* ajusta según tu imagen */
    height: 100px; /* ajusta según tu imagen */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0;
  background: #394B55;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), inset 17px -16px 12px rgba(0, 0, 0, 0.25);
  
}

        .nav-btn img {
          width: 48px; /* ajusta según tu imagen */
  height: auto;
  margin:20px;
          transition: transform 0.2s ease;
        }

        .nav-btn:hover img {
          transform: scale(1.1);
        }
          .nav-btn:hover {
  background-color: #021822;
}
button {
          padding: 10px 20px;
          border: none;
          color: #021822;
          font-weight: bold;
          cursor: pointer;
          margin: 0 10px;
          border-radius: 8px;
        }
        .nav-btn.left {
  left: -200px;
  transform: rotate(180deg); /* Voltea la flecha */
  filter: drop-shadow(-2px -2px 2px rgba(0,0,0,0.5));
}

.nav-btn.right {
  right: -200px;
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5));
}
      </style>
    `;

    const items = this.data
      .map(item => `
        <div class="carousel-item">
          <div class="image-section">
            <img src="${item.mainImage}" alt="Main">
          </div>
          <div class="info-section">
            <div class="info-content">
              <div class="title">${item.title}</div>
              <div class="description">${item.description}</div>
              <div class="icon-container">
                <img src="${item.iconImage}" alt="Icon">
              </div>
              <div class="grid-box">
                <div class="grid-inner">
                  <div><strong>Type :</strong> ${item.info[0]}</div>
                  <div><strong>Where :</strong> ${item.info[1]}</div>
                  <div><strong>Features :</strong> ${item.info[2]}</div>
                </div>
              </div>
            </div>
            <button class="action-btn">
              ${item.buttonText}
              <img src="${item.buttonIcon}" alt="Button Icon" width="20">
            </button>
          </div>
        </div>
      `)
      .join('');

    const template = `
      <div class="carousel-wrapper">
        <button class="nav-btn left"><img src="./media/arrow 2_Mesa de trabajo 1.png" alt="Prev"></button>
        <div class="carousel-track" style="transform: translateX(-${this.current * 100}%);">
          ${items}
        </div>
        <button class="nav-btn right"><img src="./media/arrow 2_Mesa de trabajo 1.png" alt="Next"></button>
      </div>
    `;

    this.shadowRoot.innerHTML = `${style}${template}`;
    this.shadowRoot.querySelector('.nav-btn.left').addEventListener('click', () => this.prev());
    this.shadowRoot.querySelector('.nav-btn.right').addEventListener('click', () => this.next());
  }

  prev() {
    this.current = (this.current - 1 + this.data.length) % this.data.length;
    this.updateTransform();
  }

  next() {
    this.current = (this.current + 1) % this.data.length;
    this.updateTransform();
  }

  updateTransform() {
    const track = this.shadowRoot.querySelector('.carousel-track');
    track.style.transform = `translateX(-${this.current * 100}%)`;
  }
}

customElements.define('square-carousel', SquareCarousel);
