
    LottieInteractivity.create({
      player: '#banner',
      mode: 'chain',
      actions: [
        {
          visibility: [0, 0.7],
          state: "autoplay",
          frames: [0, 130],
          
        },
        {
          visibility: [0.7, 1.0],
          state: 'autoplay',
          frames: [130, 50],
          transition: "onComplete"
      }
      ]
    });
