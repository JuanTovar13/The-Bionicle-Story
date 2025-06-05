
  const cardsData = [
    {
      image: 'media/Tahu-Wallpaper.jpg',
      title: 'Toa Tahu',
      text1: '<strong>First seen on:</strong> Mata Nui ',
      text2: '<strong>Element:</strong> Fire',
      text3: '<strong>Mask:</strong> Kanohi Hau, The Mask of Shielding ',
      bgColor: '#5D110E',
      textColor: '#FFFFFF'
    },
    {
      image: './media/gali.jpg',
      title: 'Toa Gali',
      text1: '<strong>First seen on:</strong> Mata Nui ',
      text2: '<strong>Element:</strong> Water',
      text3: '<strong>Mask:</strong> Kanohi Kaukau, The Mask of Water Breathing ',
      bgColor: '#1C2345',
      textColor: '#ffffff'
    },
    {
      image: './media/lewa.jpg',
      title: 'Toa Lewa',
      text1: '<strong>First seen on:</strong> Mata Nui ',
      text2: '<strong>Element:</strong> Air',
      text3: '<strong>Mask:</strong> Kanohi Miru, The Mask of Levitation',
      bgColor: '#00381A',
      textColor: '#ffffff'
    },
    {
      image: './media/ONUA.jpg',
      title: 'Toa Onua',
      text1: '<strong>First seen on:</strong> Mata Nui ',
      text2: '<strong>Element:</strong> Earth',
      text3: '<strong>Mask:</strong> Kanohi Pakari, The Mask of Strength',
      bgColor: '#323435',
      textColor: '#FFFFFF'
    },
    {
      image: './media/pohatu.jpg',
        title: 'Toa Pohatu',
        text1: '<strong>First seen on:</strong> Mata Nui ',
        text2: '<strong>Element:</strong> Stone',
        text3: '<strong>Mask:</strong> Kanohi Kakama, The Mask of Speed',
      bgColor: '#543B26',
      textColor: '#FFFFFF'
    },
    {
      image: './media/kopaka.jpg',
      title: 'Toa Kopaka',
        text1: '<strong>First seen on:</strong> Mata Nui ',
        text2: '<strong>Element:</strong> Ice',
        text3: '<strong>Mask:</strong> Kanohi Akaku, The Mask of X-Ray Vision',
      bgColor: '#D0D9E4',
      textColor: '#000000'
    }
  ];

  const container = document.getElementById('infoGrid');

  cardsData.forEach(card => {
    const div = document.createElement('div');
    div.className = 'info-card';
    div.style.backgroundColor = card.bgColor;
    div.style.color = card.textColor;

    div.innerHTML = `
      <img class="card-image" src="${card.image}" alt="${card.title}">
      <div class="card-content">
        <h3 class="card-title">${card.title}</h3>
        <p class="card-text">${card.text1}</p>
        <p class="card-text">${card.text2}</p>
        <p class="card-text">${card.text3}</p>
        <div class="button-container">
        <button class="card-button">
        <span>Explore</span>
            <img src="./media/arrow 2_Mesa de trabajo 1.png" alt="Icono" class="button-icon">
        </button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

