import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const canvas = useRef(null);
  const endRef = useRef(null);
  const stopRef = useRef(null);

  useEffect(() => {
    canvas.current.width = 1000;
    canvas.current.height = 1000;
    const frameCount = 1200;
    const currentFrame = (index) =>
      `/sequence/webp/A_${index.toString().padStart(5, "0")}.webp`;
    const images = [];
    const boosts = {
      frame: 0,
    };
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      if (i >= 300 && i < 600) {
        img.src = currentFrame(i - 300);
      } else if (i >= 600 && i < 900) {
        img.src = currentFrame(i - 600);
      } else if (i >= 900 && i < 1200) {
        img.src = currentFrame(i - 900);
      } else if (i >= 1200 && i < 1500) {
        img.src = currentFrame(i - 1200);
      } else if (i >= 1500 && i < 1800) {
        img.src = currentFrame(i - 1500);
      } else {
        img.src = currentFrame(i);
      }

      images.push(img);
    }

    gsap.to(boosts, {
      frame: frameCount - 1,
      snap: "frame",
      scrollTrigger: {
        scrub: true,
      },
      onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
    });

    const ctx = canvas.current.getContext("2d");

    var overlay = new Image();
    overlay.src = "/sequence/alpha.png";
    overlay.onload = render;

    images[0].onload = render;
    function render() {
      ctx.save();
      ctx.drawImage(images[boosts.frame], 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(overlay, 0, 0);
      ctx.restore();
    }
    gsap.to(canvas.current, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        scrub: true,
        endTrigger: endRef.current,
      },
    });
  }, [canvas]);

  useEffect(() => {
    gsap.from(".line-2", {
      scrollTrigger: {
        trigger: ".elderberry",
        scrub: true,
        anticipatePin: true,
        pin: true,
        start: "top top",
        end: "+=100%",
      },
    });

    gsap.from(".line-3", {
      scrollTrigger: {
        trigger: ".vitamin",
        scrub: true,
        anticipatePin: true,
        pin: true,
        start: "top top",
        end: "+=100%",
      },
    });
    gsap.from(".line-4", {
      scrollTrigger: {
        trigger: ".zinc",
        scrub: true,
        anticipatePin: true,
        pin: true,
        start: "top top",
        end: "+=100%",
      },
    });
  });
  return (
    <div className="bg-gradient">
      <div className="h-screen">
        <div className="flex">
          <div className="fixed bottle z-50">
            <canvas className="custom-canvas" ref={canvas}></canvas>
          </div>
        </div>
      </div>
      <div className="h-screen">
        <h2 className="h-8" ref={endRef}>
          Hello
        </h2>
        <div className="vl z-10"></div>
      </div>
      <div className="h-screen">
        <div className="vl z-10"></div>
      </div>
      <div className="h-screen">
        <h1>Hello</h1>
      </div>
      <div className="h-screen">
        <h1>Hello</h1>
      </div>
      <div className="h-screen">
        <h1>Hello</h1>
      </div>
      <div className="h-screen flex elderberry ">
        <p className="m-auto">
          <span className="line line-2"></span>This orange panel gets pinned
          when its top edge hits the top of the viewport, then the line's
          animation is linked with the scroll position until it has traveled
          100% of the viewport's height (<code>end: "+=100%"</code>), then the
          orange panel is unpinned and normal scrolling resumes. Padding is
          added automatically to push the rest of the content down so that it
          catches up with the scroll when it unpins. You can set{" "}
          <code>pinSpacing: false</code> to prevent that if you prefer.
        </p>
      </div>
      <div className="h-screen flex vitamin ">
        <p className="m-auto">
          <span className="line line-3"></span>This orange panel gets pinned
          when its top edge hits the top of the viewport, then the line's
          animation is linked with the scroll position until it has traveled
          100% of the viewport's height (<code>end: "+=100%"</code>), then the
          orange panel is unpinned and normal scrolling resumes. Padding is
          added automatically to push the rest of the content down so that it
          catches up with the scroll when it unpins. You can set{" "}
          <code>pinSpacing: false</code> to prevent that if you prefer.
        </p>
      </div>
      <div className="h-screen flex zinc ">
        <p className="m-auto">
          <span className="line line-4"></span>This orange panel gets pinned
          when its top edge hits the top of the viewport, then the line's
          animation is linked with the scroll position until it has traveled
          100% of the viewport's height (<code>end: "+=100%"</code>), then the
          orange panel is unpinned and normal scrolling resumes. Padding is
          added automatically to push the rest of the content down so that it
          catches up with the scroll when it unpins. You can set{" "}
          <code>pinSpacing: false</code> to prevent that if you prefer.
        </p>
      </div>

     
      <div ref={stopRef} className="h-screen ">
        <h1>Hello</h1>
      </div>

      <footer>Get boosted</footer>
    </div>
  );
}
