import { InputTwoTone } from "@mui/icons-material";
import { message } from "antd";
import html2canvas from "html2canvas";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import {
  CIRCLE,
  ERASER,
  LINE,
  PENCIL,
  RECTANGLE,
  TEXT,
  TRIANGLE,
} from "../../../../constants";
import { SelectedTool } from "../../../../dto/whiteboard.dto";
interface MyCanvasProps {
  drawColor: string;
  selectedTool: SelectedTool;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const MyCanvas: React.FunctionComponent<MyCanvasProps> = ({
  drawColor,
  selectedTool,
  socket,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const parentCanvasRef = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState<string>("Sample Text");
  useLayoutEffect(() => {
    message.success("Bydefault Pencil is selected");
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvasRef.current.style.position = "absolute";
      canvasRef.current.style.top = "0px";
      canvasRef.current.style.left = "0px";
      // ...then set the internal size to match
      //   canvas.width = canvas.offsetWidth;
      //   canvas.height = canvas.offsetHeight;
      //   canvas.style.width = "100%";
      //   canvas.style.height = "100%";

      const context = canvas?.getContext("2d");

      if (canvasRef.current) {
        if (context) {
          context.scale(2, 2);
          context.lineCap = "round";
          console.log(drawColor);
          context.lineWidth = 2;
          contextRef.current = context;
          socket?.on("connect", () => {
            console.log(socket.id);

            socket.on("send-picture", (image) => {
              console.log("recieved", image);
              const myCanvas = canvasRef.current;
              const context = myCanvas?.getContext("2d");
              if (context) {
                let makeImage = new Image();
                makeImage.onload = () => {
                  makeImage.style.position = "absolute";
                  makeImage.style.top = "0px";
                  makeImage.style.left = "0px";
                  console.log("recieved", "image");

                  makeImage.style.width = "100%";
                  makeImage.style.height = "79%";
                  // makeImage.style.overflow = "hidden"

                  context.drawImage(makeImage, 0, 0);
                  // parentCanvasRef.current?.appendChild(makeImage)
                };
                makeImage.src = image;
              }
            });

            socket.on("clear-picture", (message) => {
              contextRef.current?.clearRect(0, 0, canvas.width, canvas.height);
            });
          });
        }
      }
    }
  }, []);

  // const handleChange = (e: any) => {
  //   console.log(e.target.value);
  //   setTextValue(e.target.value)
  // };

  // const onBlur = (e: any) => {
  //   console.log(e.target.value);
  // };

  const handleDragStart = (e: any) => {
    console.log(e.target.id);
    e.dataTransfer.setData("text", e.target.id);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    console.log(e);
    var input = document.getElementById(data);
    // e.target.appendChild();
    console.log(input, e.clientY, e.clientX);

    if (input) {
      console.log(e.clientY);

      input.style.position = "absolute";
      const { offsetX, offsetY } = e.nativeEvent;
      input.style.top = `${offsetY}px`;
      input.style.left = `${offsetX}px`;
      parentCanvasRef.current?.appendChild(input);
      console.log(input);
      var parent: any = document.getElementById("drawing-area");
      html2canvas(parent).then((canvas) => {
        var image = canvas.toDataURL();

        console.log("send image", image);

        socket?.emit("send-picture", image);
      });
    }
  };

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas?.getContext("2d");
      if (canvasRef.current) {
        if (context) {
          context.strokeStyle = drawColor;
          contextRef.current = context;
          //   contextRef.current?.beginPath();
          console.log(selectedTool);
          contextRef.current.beginPath();
          if (selectedTool.name === CIRCLE) {
            contextRef.current.arc(
              canvas.width / 8 + 77,
              canvas.height / 8 + 50,
              50,
              0,
              2 * Math.PI
            );
          } else if (selectedTool.name === RECTANGLE) {
            console.log("rectangle drawn", canvas.width / 2, canvas.height / 2);
            contextRef.current.rect(
              canvas.width / 8,
              canvas.height / 8,
              150,
              100
            );
          } else if (selectedTool.name === TRIANGLE) {
            // contextRef.current.moveTo(100, 300);
            // contextRef.current.lineTo(200, 200);
            // contextRef.current.moveTo(300, 300);
            // contextRef.current.lineTo(200, 200);
            // contextRef.current.moveTo(100, 300);
            // contextRef.current.lineTo(300, 300);
            contextRef.current.moveTo(350, 350);
            contextRef.current.lineTo(450, 190);
            contextRef.current.moveTo(550, 350);
            contextRef.current.lineTo(450, 190);
            contextRef.current.moveTo(350, 350);
            contextRef.current.lineTo(550, 350);
          } else if (selectedTool.name === LINE) {
            contextRef.current.lineTo(200, 200);
            contextRef.current.lineTo(400, 200);
          } else if (selectedTool.name === ERASER) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
          } else if (selectedTool.name === TEXT) {
            var input = document.createElement("input");
            input.type = "text";
            input.id = "1";
            input.style.position = "absolute";
            input.style.top = "250px";
            input.style.left = "450px";
            input.style.height = "30px";
            input.style.borderRadius = "10px";
            input.style.padding = "10px";
            input.value = textValue;
            input.draggable = true;
            input.ondragstart = handleDragStart;
            // input.disabled = true
            // input.onchange = handleChange;
            parentCanvasRef.current?.appendChild(input);
          }
          contextRef.current.stroke();
          if (selectedTool.name !== PENCIL && selectedTool.name !== ERASER) {
            var parent: any = document.getElementById("drawing-area");
            html2canvas(parent).then((canvas) => {
              var image = canvas.toDataURL();

              console.log("send image", image);

              socket?.emit("send-picture", image);
            });
          } else if (selectedTool.name === ERASER) {
            socket?.emit("clear-picture", "clear");
          }
          //   contextRef.current?.stroke();
          //   contextRef.current?.closePath();
        }
      }
    }
  }, [drawColor, selectedTool]);

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
    if (selectedTool.name === PENCIL) {
      contextRef.current?.lineTo(offsetX, offsetY);
    }
    contextRef.current?.stroke();
    // console.log(offsetX, offsetY);
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    if (selectedTool.name === PENCIL) {
      var parent: any = document.getElementById("drawing-area");
      html2canvas(parent).then((canvas) => {
        var image = canvas.toDataURL("image/png");

        console.log("send image", image);

        socket?.emit("send-picture", image);
      });
      // socket?.emit("send-picture", canvasRef.current?.toDataURL("image/png"));
    }
    setIsDrawing(false);
  };

  return (
    <div
      ref={parentCanvasRef}
      id="drawing-area"
      className="drawing-area"
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      ></canvas>
    </div>
  );
};

export default MyCanvas;
