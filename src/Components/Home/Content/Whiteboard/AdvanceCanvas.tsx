import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  CIRCLE,
  LINE,
  PENCIL,
  RECTANGLE,
  TRIANGLE,
} from "../../../../constants";

import io from "socket.io-client";
interface AdvanceCanvasProps {
  drawColor: string;
  selectedTool: string;
}

const AdvanceCanvas: React.FunctionComponent<AdvanceCanvasProps> = ({
  drawColor,
  selectedTool,
}) => {
  const socket = io("http://localhost:3002", { transports: ["websocket"] });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
    
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.strokeRect(10,10,100,100)
    }
  }, []);
  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     if (canvas) {
  //       canvas.width = window.innerWidth * 2;
  //       canvas.height = window.innerHeight * 2;
  //       canvas.style.width = `${window.innerWidth}px`;
  //       canvas.style.height = `${window.innerHeight}px`;

  //       // ...then set the internal size to match
  //       //   canvas.width = canvas.offsetWidth;
  //       //   canvas.height = canvas.offsetHeight;
  //       //   canvas.style.width = "100%";
  //       //   canvas.style.height = "100%";

  //       const context = canvas?.getContext("2d");

  //       if (canvasRef.current) {
  //         if (context) {
  //           context.scale(2, 2);
  //           context.lineCap = "round";
  //           console.log(drawColor);
  //           context.lineWidth = 2;
  //           contextRef.current = context;
  //           socket.on("connect", () => {
  //             console.log(socket.id);

  //             // socket.on("send-picture", (image) => {
  //             //   console.log("recieved", image);

  //             //   let makeImage = new Image();
  //             //   makeImage.onload = () => {
  //             //     contextRef.current?.drawImage(makeImage, 0, 0);
  //             //   }
  //             //   makeImage.src = image;
  //             // });
  //           });
  //         }
  //       }
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     if (canvas) {
  //       const context = canvas?.getContext("2d");
  //       if (canvasRef.current) {
  //         if (context) {
  //           context.strokeStyle = drawColor;
  //           contextRef.current = context;
  //           //   contextRef.current?.beginPath();
  //           console.log(selectedTool);
  //           contextRef.current.beginPath();
  //           if (selectedTool === CIRCLE) {
  //             contextRef.current.arc(
  //               canvas.width / 8 + 77,
  //               canvas.height / 8 + 50,
  //               50,
  //               0,
  //               2 * Math.PI
  //             );
  //           } else if (selectedTool === RECTANGLE) {
  //             console.log("rectangle drawn", canvas.width / 2, canvas.height / 2);
  //             contextRef.current.rect(
  //               canvas.width / 2 - 150,
  //               canvas.height / 2 - 100,
  //               150,
  //               100
  //             );
  //           } else if (selectedTool === TRIANGLE) {
  //             contextRef.current.moveTo(100, 300);
  //             contextRef.current.lineTo(200, 200);
  //             contextRef.current.moveTo(300, 300);
  //             contextRef.current.lineTo(200, 200);
  //             contextRef.current.moveTo(100, 300);
  //             contextRef.current.lineTo(300, 300);
  //           } else if (selectedTool === LINE) {
  //             contextRef.current.lineTo(200, 200);
  //             contextRef.current.lineTo(400, 200);
  //           }
  //           contextRef.current.stroke();
  //           //   contextRef.current?.stroke();
  //           //   contextRef.current?.closePath();
  //         }
  //       }
  //       socket.emit("send-picture", canvasRef.current?.toDataURL("image/png"));
  //     }
  //   }, [drawColor, selectedTool]);

  const startDrawing = (event: any) => {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX, offsetY);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event: any) => {
    if (!isDrawing) return;
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;
    if (selectedTool === PENCIL) {
      contextRef.current?.lineTo(offsetX, offsetY);
    }
    contextRef.current?.stroke();
    // console.log(offsetX, offsetY);
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    socket.emit("send-picture", canvasRef.current?.toDataURL("image/png"));
    setIsDrawing(false);
  };

  return (
    <div className="drawing-area">
      <canvas
        id="canvas"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      ></canvas>
    </div>
  );
};

export default AdvanceCanvas;
