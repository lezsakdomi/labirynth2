console.clear();
console.log("Setting up the game...");

origo = {
  x: 0,
  y: 0
};
ctx = undefined;
doPaint = false;
run = undefined;
mrun = undefined;
drawMethod = "tesco";
colors={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};
previusColor=undefined;
waita=[];
waiti=0;
shapeDelay=0; //DON'T TURN IT ON!!! //Its commented out, so do'nt worry, but...
keyPressTriggers=[];
logDrawing=false;
buffer=[];



function indev(){
	return iamdev.checked;
}



function pausecomp(ms) {
	//windows
	ms += new Date().getTime();
	while (new Date() < ms){}
}

function iwait(icwaiti, ims){ //Not working!!!
	console.log(
		setTimeout(function(){
			waita[icwaiti]=false;
			console.log("Wait #"+icwaiti+" ("+ims+" ms) completed.");
		}, ims)
	);
}

function wait(ms){
	var cwaiti=++waiti;
	waita[cwaiti]=true;
	iwait(cwaiti, ms);
	while(waita[cwaiti]){}
	return true;
}

function compareColors(c1, c2){
	c1=colorToHex(c1);
	c2=colorToHex(c2);
	return c1==c2;
}

function colorToHex(color){
	if (color.substring(0, 1)!="#") color=colors[color];
	return color;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToHsv (hex) {
    var rr, gg, bb;
		var rgb=hexToRgb(hex);
		var
        r = rgb.r,
        g = rgb.g,
        b = rgb.b,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (!diff) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function hexToHsl(hex){
		var rgbArr=hexToRgb(hex);
    var r1 = rgbArr.r / 255;
    var g1 = rgbArr.g / 255;
    var b1 = rgbArr.b / 255;
 
    var maxColor = Math.max(r1,g1,b1);
    var minColor = Math.min(r1,g1,b1);
    //Calculate L:
    var L = (maxColor + minColor) / 2 ;
    var S = 0;
    var H = 0;
    if(maxColor != minColor){
        //Calculate S:
        if(L < 0.5){
            S = (maxColor - minColor) / (maxColor + minColor);
        }else{
            S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        //Calculate H:
        if(r1 == maxColor){
            H = (g1-b1) / (maxColor - minColor);
        }else if(g1 == maxColor){
            H = 2.0 + (b1 - r1) / (maxColor - minColor);
        }else{
            H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
    }
 
    L = L * 100;
    S = S * 100;
    H = H * 60;
    if(H<0){
        H += 360;
    }
    var result = {h: H, s: S, l: L};
    return result;
}



function getMapSize() {
  return {
    x: 1,
    y: 1
  };
}

function getViewSize() {
  return {
    x: (minimap.width-1)/2,
    y: minimap.height
  };
}

function getPos() {
  return {
    x: 5,
    y: 5
  };
}

function getRel() {
  return {
    x: -1,
    y: 2
  };
}

function getRelColor(rel){
	return getRel12Color(rel);
}

function getRel12Color(rel){
	var rel2={x: rel.x, y: rel.y};
	turn(rel2, -Number(angle.value));
	
	rel2.x+=Number(relx.value);
	rel2.y+=Number(rely.value);
	
	rel2.x=Math.round(rel2.x + minimap.width / 2);
	rel2.y=Math.round(minimap.height - rel2.y);
	
	return getGlobColor(rel2);
}

function getGlobColor(rel2){
	moPx(rel2, "rgba(0, 128, 0, 128)");
	
	if((rel2.x<0)||(rel2.x>=buffer.width)||(rel2.y<0)||(rel2.y>=buffer.height)){
		console.error("Out of minimap", rel2);
		return "black";
	}
	
	var pos=(rel2.y*buffer.width+rel2.x)*4;
	//var imageData = [];
	//console.log(buffer.data[pos+0], buffer, pos, rel2);
	var color=rgbToHex(buffer.data[pos+0], buffer.data[pos+1], buffer.data[pos+2]);
	moPx(rel2, color);
	return color;
}

function moPx(pos, color){
	if (!indev()) return;

	moctx.beginPath();
	moctx.strokeStyle=color;
	moctx.moveTo(pos.x, pos.y);
	moctx.lineTo(pos.x, pos.y+1);
	moctx.stroke();
}

function turn(rel, angle){
	var rel2={x: rel.x, y: rel.y};
	rel.x=Math.cos(Math.PI/2+angle)*rel2.y+Math.cos(angle)*rel2.x;
	rel.y=Math.sin(Math.PI/2+angle)*rel2.y+Math.sin(angle)*rel2.x;
}



function beginDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //rect(origo, canvas, "white");
	
	moctx.clearRect(0, 0, moverlay.width, moverlay.height);
	//moctx.beginPath();
	
	buffer=mctx.getImageData(0, 0, minimap.width, minimap.height);
}

function endDraw() {
	//moctx.stroke();
}

function reDraw(auto) {
  var start = performance.now();

  rel = {
    x: relx.value,
    y: rely.value,
  };
	
  if (auto === false) drawPixel(rel, (relcolor.value = getRelColor(rel)) == "#000000");
  else {
		var viewSize = getViewSize();
		
		switch(drawMethod){ //Its still constantly Tesco
			case "tesco":
				beginDraw();

				var to={
					x: 0,
					y: 0
				};
				var step;

				to.y=viewSize.y;

				for(to.x=-viewSize.x; to.x<=viewSize.x; to.x++){
					step=to.x/to.y;
					for(rel.y=1, rel.x=step; rel.y<=to.y; rel.y++, rel.x+=step)
						if (tryDraw(rel)) break;
						//pausecomp(shapeDelay);
				}

				endDraw();
				break;
			
			default:
			case "basic":
			case "overhead":
				beginDraw();
				
				for (rel.y = viewSize.y; rel.y > 0; rel.y--)
					for (rel.x = -viewSize.x / 2; rel.x <= viewSize.x / 2; rel.x++){
						//drawPixel(rel, getRelColor(rel) == "#000000");
						tryDraw(rel);
						//pausecomp(shapeDelay);
				}
				
				endDraw();
				break;
			}
  }

  var end = performance.now();
  var took = (end - start) / 1000;
  time.value = Number(took).toFixed(3) + " s";
  fps.value = Number(1 / took).toFixed(2) + " fps";
  if (!indev(console.log(fps.value)));
}

function tryDraw(rel) {
	//console.log(rel);
	
	relcolor.value=getRelColor(rel);
  if (!compareColors(relcolor.value, "white")) {
		drawPixel(rel, relcolor.value);
		if (compareColors(relcolor.value, "black")) {
			return true; //Wall - Do'nt continue
		} else {
			//return false; //Other
			return true; //Stop here!
		}
	} else return null; //Not applicable - continue
}

function rect(pos, size, color) { //pos: {x, y}, size: {width, height}, color: text=undefined
  if (color) {
    previusColor = ctx.fillStyle;
    ctx.fillStyle = color;
  }

  ctx.fillRect(pos.x, pos.y, size.width, size.height);

  if (color) {
    ctx.fillStyle = previusColor;
  }
}



function drawPixel(rel, wall) { //rel: {x, y}, wall: Boolean
  var size = {
    width: 0,
    height: 0
  };
  var middle = {
    x: 0,
    y: 0
  };
  var color = "black";

  var viewSize = getViewSize();

  size = {
    width: canvas.width / ((viewSize.x * 2 * (rel.y - 1) + viewSize.y - rel.y) / (viewSize.y - 1) + 1), //fine
    //based on (viewSize.x*2-1)/(divisor-1)=(viewSize.y-1)/(rel.y-1)
    height: canvas.height / viewSize.y * (viewSize.y - rel.y + 1) //fine
  };

  middle = {
    x: (canvas.width / 2) + (size.width * rel.x), //fine
    y: (canvas.height / 2) //fine
  };

  if ((wall || (wall === undefined)) && (rel.y >= 1) && (rel.y <= viewSize.y)) {
		if (typeof wall == "string"){
			hsl=hexToHsl(colorToHex(wall));
			color="hsl("+hsl.h+", "+hsl.s+"%, "+100 / (viewSize.y + 1) * rel.y + "%)";
		}
		else color = "hsl(0, 0%, " + 100 / (viewSize.y + 1) * rel.y + "%)"; //fine
	} else color = "rgba(0, 0, 0, 0)";

  //console.log(size, middle, color);

  rect({
      x: middle.x - size.width / 2,
      y: middle.y - size.height / 2
    },
    size,
    color
  );
}



function init(fast) {
	console.log("GUI loaded/refreshed. Initialising...");
  ctx = canvas.getContext("2d");
  ctx.shadowColor = "gray";
  ctx.shadowBlur = 0;
  ctx.fillStyle = "black";
	ctx.globalCompositeOperation="destination-over";

  mctx = minimap.getContext("2d");
  mctx.fillStyle = "white";
  mctx.fillRect(0, 0, minimap.width, minimap.height);
  mctx.fillStyle = "white";
  mctx.lineWidth = 2;
	
	moverlay.width=minimap.width+10;
	moverlay.height=minimap.height+10;
	moverlay.style.left=-(moverlay.width-10)+"px";
	moverlay.style.top=10;
	
	moctx = moverlay.getContext("2d");
	moctx.lineWidth=1;
	moctx.strokeStyle="rgba(0, 128, 0, 128)";
	moctx.globalCompositeOperation="xor";
	
	console.log("Ready to go!");
	
	iamdev.checked=false;
	iamdev.onchange();
	
	if (!fast) {
		console.log("Slow init triggered. Initially reDraw...");
		reDraw();
	} else console.log("Fast init triggered. Skip reDraw...");
	
	console.log("");
	console.log("   === init() finished ===");
	console.log("");
}



function move(rel){
	var rel2={x: rel.x, y: rel.y};
	//console.log(rel2);
	turn(rel2, -Number(angle.value));
	if(logDrawing){
		//console.log(rel2);
	}
	rel2.x+=Number(relx.value);
	rel2.y+=Number(rely.value);
	//console.log(rel2);
	if (compareColors(getGlobColor(rel2), "white")) {
		relx.value=rel2.x;
		rely.value=rel2.y;
	} else {
		console.log("Way is blocked!!", rel2);
		moPx({x: rel2.x + minimap.width / 2, y: minimap.height - rel2.y}, "red")
	}
}

function keyPress(keyCode){
	switch(keyCode){
		case 37: // <--
		case 65: //  A
			move({x: -1, y: 0});
			break;
		
		case 39: // -->
		case 68: //  D
			move({x: +1, y: 0});
			break;
		
		case 38: // /|\
		case 87: //  W
			move({x: 0, y: +1});
			break;
		
		case 40: // \|/
		case 83: //  S
			move({x: 0, y: -1});
			break;
		
		case 226: //  Í
		case 33: // PgUp
			angle.value=Number(angle.value)-0.03;
			break;
		
		case 67: //  C
		case 34: //PgDn
			angle.value=Number(angle.value)+0.03;
			break;
		
		default:
			console.log("Unhandled keyPress: #"+keyCode+" ('"+String.fromCharCode(keyCode)+"')");
	}
}

function mouseMove(event){
	angle.value=Number(angle.value)+event.movementX/100;
	//console.log(event.movementX, relx.value);
}

document.addEventListener('pointerlockchange', function(event){
	if (document.pointerLockElement===canvas){
		document.addEventListener('mousemove', mouseMove);
	} else {
		document.removeEventListener('mousemove', mouseMove);
	}
});

//setInterval(function(){console.log("s")}, 1000) //For debugging

console.log("Game sucessfully prepared!");
