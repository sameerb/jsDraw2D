/**********************************************************************************
*
* Project Name:		jsDraw2D (Graphics Library for JavaScript)
* Version:		Beta 1.1.2 (22-March-2011) (Uncompressed)
* Project Homepage:	http://jsdraw2d.jsfiction.com
* Author:		Sameer Burle
* Copyright 2009-2012:	jsFiction.com (http://www.jsfiction.com)
* Licensed Under:	LGPL
*
* This program (library) is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
************************************************************************************/

//jsColor class holds the color information and provides some color related basic functions.
function jsColor()
{
	//Member variables
	var hex="#000000";
	
	switch(arguments.length)
	{
		//Hexadecimal Color
		case 1:
            setHex(arguments[0]);			
			break;
		//RGB Color
		case 3:
			var red=arguments[0];
			var green=arguments[1];
			var blue=arguments[2];
			hex=rgbToHex(red,green,blue);
			if(hex==false)
				hex="#000000";
			break;
	}
	
	//Public Methods
	
	//Set color by specifying the hexa-decimal value. 
	this.setHex=setHex;
	function setHex(hexColor)
	{
	    if(hexColor.charAt(0)=="#")
		{
			hex=hexColor;
		}
		else
		{
            if(isNaN(hexColor))
            {
                setNamedColor(hexColor.toLowerCase());
            }
            else
            {			
				hex="#" + hexColor;
		    }    
		}
			
		var rgbArray=hexToRgb(hex);
		if(!rgbArray)
		{
		    hex="#000000"
		}
	}
	//Get the hexa-decimal value of the object
	this.getHex=getHex;
	function getHex()
	{
	    return hex;
	}
	
	//Set color by specifying the RGB values.
	this.setRGB=setRGB;
	function setRGB(redValue,greenValue,blueValue)
	{
		hex=rgbToHex(redValue,greenValue,blueValue);
		if(hex==false)
			hex="#000000";
	}
	
	//Get the RGB values of the object
	this.getRGB=getRGB;
	function getRGB()
	{
	    return hexToRgb(hex);
	}
	
	//Returns new jsColor object with darker color shade 
	this.getDarkerShade=getDarkerShade;
	function getDarkerShade(value)
	{
		var redValue,greenValue,blueValue;
		var resArray=getRGB();
		
		if(!isNaN(value))
		{
			redValue=parseInt(resArray[0]-value);
			greenValue=parseInt(resArray[1]-value);
			blueValue=parseInt(resArray[2]-value);
		}
		
		if(redValue<0)
			redValue=0;
		if(greenValue<0)
			greenValue=0;
		if(blueValue<0)
			blueValue=0;
			
		return new jsColor(redValue,greenValue,blueValue);	
	}

	//Returns new jsColor object with lighter color shade 
	this.getLighterShade=getLighterShade;	
	function getLighterShade(value)
	{
		var redValue,greenValue,blueValue;
		var resArray=getRGB();
		
		if(!isNaN(value))
		{
			redValue=parseInt(resArray[0]+value);
			greenValue=parseInt(resArray[1]+value);
			blueValue=parseInt(resArray[2]+value);
		}
		
		if(redValue>255)
			redValue=255;
		if(greenValue>255)
			greenValue=255;
		if(blueValue>255)
			blueValue=255;
		
		return new jsColor(redValue,greenValue,blueValue);	
	}

	//Static-Shared Utility Methods
	
	//Convert RGB color to Hex color
	this.rgbToHex=rgbToHex;
	function rgbToHex(redValue, greenValue, blueValue)
	{
		//Check argument values
		if(redValue<0 || redValue>255 || greenValue<0 || greenValue>255 || blueValue<0 || blueValue>255)
		{
			return false;
		}
		                        		
   		var colorDec = Math.round(blueValue) + 256 * Math.round(greenValue) + 65536 * Math.round(redValue);
   		return "#" + zeroPad(colorDec.toString(16),6);
	}
	
	//Convert Hex color to RGB color
	this.hexToRgb=hexToRgb;
	function hexToRgb(hexValue)
	{
		var redValue,greenValue,blueValue;
		if(hexValue.charAt(0)=="#")
		{
			hexValue=hexValue.substring(1,7);
		}
		
		redValue=parseInt(hexValue.substring(0,2),16);
		greenValue=parseInt(hexValue.substring(2,4),16);
		blueValue=parseInt(hexValue.substring(4,6),16);
		
		//Check argument values
		if(redValue<0 || redValue>255 || greenValue<0 || greenValue>255 || blueValue<0 || blueValue>255)
		{
			return false;
		}

		return new Array(redValue,greenValue,blueValue);
	}

	//Private Methods
	//Set the color using specified name of the color out of 16 web colors.
	function setNamedColor(colorName)
	{
	    switch(colorName)
        {   
            case "aqua":
                hex="#00FFFF";
                break;
            case "black":
                hex="#000000";
                break;
            case "blue":
                hex="#0000FF";
                break;
            case "fuchsia":
                hex="#FF00FF";
                break;
            case "green":
                hex="#008000";
                break;
            case "gray":
                hex="#808080";
                break;
            case "lime":
                hex="#00FF00";
                break;
            case "maroon":
                hex="#800000";
                break;
            case "navy":
                hex="#000080";
                break;
            case "olive":
                hex="#808000";
                break;
            case "purple":
                hex="#800080";
                break;
            case "red":
                hex="#FF0000";
                break;
            case "silver":
                hex="#C0C0C0";
                break;
            case "teal":
                hex="#008080";
                break;
            case "white":
                hex="#FFFFFF";
                break;
            case "yellow":
                hex="#FFFF00";
                break;
        }
	}
	
	//Add zero padding to the left. Used for building hexa-decimal string.	
	function zeroPad(val,count)
	{ 
		var valZeropad = val + "";
		while(valZeropad.length < count) 
		{
			valZeropad = "0" + valZeropad; 
		}
		return valZeropad;
	}

}

//jsFont class holds the font information which can be used by other objects in object oriented way.
function jsFont(family,weight,size,style,variant)
{
    //Properties: family, weight, size, style and varient with default value null
    this.family=null;
    this.weight=null;
    this.size=null;
    this.style=null;
    this.variant=null;
    
    if(family && family!="")
        this.family=family;
    
    if(weight && weight!="")
        this.weight=weight;

    if(size && size!="")
        this.size=size;
        
    if(style && style!="")
        this.style=style;
    
    if(variant && variant!="")
        this.variant=variant;
}

//jsPen class holds the drawing pen/stroke information. Mainly it holds the color and width values to be used for 2D drawing. 
//All draw methods take jsPen object as a parameter. Acts like a pen for drawing.
function jsPen(color,width)
{
	this.color=new jsColor();	//color proprty of jsColor type
	this.width="1px";			//width property with 1px default value
	
	if(arguments.length>0)
	{
		this.color=color;	
	}
	if(arguments.length>=2)
	{
		this.width=width;
	}
	if(!isNaN(width))
	{
		this.width=width+"px";
	}
}

//jsPoint class holds the 2D drawing point information. It holds values of x and y coordinates of the point.
function jsPoint(x,y)
{
	this.x=0;
	this.y=0;

	if(arguments.length==2)
	{
		this.x=x;
		this.y=y;
	}
}

function jsGraphics(canvasDivElement)
{
	//Private member variables
	var origin=new jsPoint(0,0);
	var scale=1;
	var coordinateSystem="default";	//Possible values "default" or "cartecian"
	var canvasDiv;
	
	if(canvasDivElement)
		canvasDiv=canvasDivElement;
	else
		canvasDiv=document.body;	//Document will be used directly for drawing
	
	var gridDiv=null;
	
	//Public Methods
	this.drawLine=drawLine;
	this.drawRectangle=drawRectangle;
	this.fillRectangle=fillRectangle;
	this.drawCircle=drawCircle;
	this.drawEllipse=drawEllipse;
	this.fillCircle=fillCircle;
	this.fillEllipse=fillEllipse;
	this.fillArc=fillArc;
	this.drawArc=drawArc;
	this.drawPolyline=drawPolyline;
	this.drawPolygon=drawPolygon;
	this.fillPolygon=fillPolygon;
	this.drawBezier=drawBezier;
	this.drawPolyBezier=drawPolyBezier;
	this.drawCurve=drawCurve;
	this.drawClosedCurve=drawClosedCurve;
	this.fillClosedCurve=fillClosedCurve;
	this.drawText=drawText;
	this.drawImage=drawImage;
	this.clear=clear;
	this.showGrid=showGrid;
	this.hideGrid=hideGrid;
	this.setOrigin=setOrigin;
	this.getOrigin=getOrigin;
	this.setScale=setScale;
	this.getScale=getScale;
	this.setCoordinateSystem=setCoordinateSystem;
	this.getCoordinateSystem=getCoordinateSystem;
	this.logicalToPhysicalPoint=logicalToPhysicalPoint;
	
	//Initialization
	
	//Grid initialization
	gridDiv=document.createElement("div");
	gridDiv.style.left="0px";
	gridDiv.style.top="0px";
	if(canvasDiv.clientWidth>0 && canvasDiv.clientHeight>0)
	{
	    gridDiv.style.width=(parseInt(canvasDiv.clientWidth)-1) + "px";
	    gridDiv.style.height=(parseInt(canvasDiv.clientHeight)-1) + "px";
	}
	else
	{
	    gridDiv.style.width="0px";
	    gridDiv.style.height="0px";
	}    
	gridDiv.style.zIndex=0;
	gridDiv.style.position="absolute";
	gridDiv.style.display="none";
	canvasDiv.appendChild(gridDiv);

	//Origin
	function setOrigin(point)
	{
		origin=point;	
	}
	
	function getOrigin()
	{
		return origin;
	}

	//Scale
	function setScale(value)
	{
		scale=value;	
	}
	
	function getScale()
	{
		return scale;
	}
	
	//Coordinate System
	function setCoordinateSystem(name)
	{
		name=name.toLowerCase()
		if(name.toLowerCase() != "default" && name.toLowerCase() != "cartecian")
		{
			coordinateSystem="default";
		}
		else
		{
			coordinateSystem=name;
		}
	}
	
	function getCoordinateSystem()
	{
		return coordinateSystem=name;
	}
	
	//Conversion of logical point to physical point based on coordinate system, origin and scale.
	function logicalToPhysicalPoint(point)
	{
		if(coordinateSystem=="cartecian")
		{
			return new jsPoint(point.x*scale+origin.x,origin.y-point.y*scale)
		}
		else
		{
			return new jsPoint(point.x*scale+origin.x,point.y*scale+origin.y)
		}
	}
	
	//Display background grid
	function showGrid(range,showRange,color)
	{
		if(showRange==null)	
			showRange=true;	//range is grid interval. The values will be shown if showRange is true.
			
		var x0,x1,y0,y1;
		var isLeft=false; //range display on left side of y-axis if true otherwise right side.
		var isUp=false;	//range display above the x-axis if true otherwise below.
		gridDiv.innerHTML="";

		if(!color)
			color=new jsColor(200,200,200);
			
		if(!range)
			range=Math.round(parseInt(gridDiv.style.width)/10);	//If range not specified, use grid with devided by 10 as range.
		else	
			range=range*scale;
			
		var hexColor=color.getHex();
		
		//If grid height or width is not available, the grid will not be displayed.
		if(parseInt(gridDiv.style.width)<=0 || parseInt(gridDiv.style.height)<=0)
		    return;
		else
		    gridDiv.style.display="";
		    
		x0=parseInt(gridDiv.style.left)
		x1=parseInt(gridDiv.style.left)+parseInt(gridDiv.style.width);
		y0=parseInt(gridDiv.style.top);
		y1=parseInt(gridDiv.style.top)+parseInt(gridDiv.style.height);

		//On which side of the axis the range to be displayed is decided based on position of the origin in the canvas.
		//Range is displyed on opposite side of the largest section(out of 4 section divided by the 2 axis)  
		if(origin.x-parseInt(gridDiv.style.left)<=parseInt(gridDiv.style.left)+gridDiv.offsetWidth-origin.x)
			isLeft=true
			
		if(origin.y-parseInt(gridDiv.style.top)<=parseInt(gridDiv.style.top)+gridDiv.offsetHeight-origin.y)
			isUp=true
			
		var iHtml=new Array();	//Holds inner html
		var rangeFont=new jsFont("arial",null,"9px");
		var rangeColor=color.getDarkerShade(150);
		var hexRangeColor=rangeColor.getHex(); 

		//Draw the border grids
 		iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;z-index:-100;left:" + x0 + "px;top:" + y0 + "px;width:" + (x1-x0+1) + "px;height:1px;background-color:" + hexColor + "\"></DIV>";
 		iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;z-index:-100;left:" + x0 + "px;top:" + y1 + "px;width:" + (x1-x0+1) + "px;height:1px;background-color:" + hexColor + "\"></DIV>";
 		iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;z-index:-100;left:" + x0 + "px;top:" + y0 + "px;width:1px;height:" + (y1-y0+1) + "px;background-color:" + hexColor + "\"></DIV>";
 		iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;z-index:-100;left:" + x1 + "px;top:" + y0 + "px;width:1px;height:" + (y1-y0+1) + "px;background-color:" + hexColor + "\"></DIV>";

		var gridHeight=gridDiv.offsetHeight;
		var gridWidth=gridDiv.offsetWidth;
		var lastRangeDiv; //previous range div
		var currentRangeDiv //current range div
	
		//Draw vertical grid lines
		for(var x=(origin.x-x0)%range;x<x1;x+=range)
		{
			if(x==origin.x && x>=x0)
			{
				if(x>=x0 && x<=x1)
		 			iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;z-index:-99;left:" + x + "px;top:" + y0 + "px;width:1px;height:" + gridHeight + "px;background-color:" + hexRangeColor + "\"></DIV>";
	 		}	
			else
			{
	 			iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;z-index:-100;left:" + x + "px;top:" + y0 + "px;width:1px;height:" + gridHeight + "px;background-color:" + hexColor + "\"></DIV>";
	 		}	
	 			
			if(showRange && x>=x0 && x<x1)
			{	 		
	 			if(lastRangeDiv && lastRangeDiv.offsetLeft + lastRangeDiv.offsetWidth + 1 < x)
	 			{
	 				if(lastRangeDiv.offsetWidth < x1-x)
	 					currentRangeDiv = drawRange(Math.round((x-origin.x)/scale),new jsPoint(x+2,y0+1+origin.y),rangeFont,rangeColor);
	 			}	
	 			else if(!lastRangeDiv)
	 				currentRangeDiv = drawRange(Math.round((x-origin.x)/scale),new jsPoint(x+2,y0+1+origin.y),rangeFont,rangeColor);
	 			
				if(currentRangeDiv)
				{
	 				if(!isUp)
					{
						if(parseInt(currentRangeDiv.style.top)+currentRangeDiv.offsetHeight > y1)
		 					currentRangeDiv.style.top=y1-currentRangeDiv.offsetHeight-1;
					}
					else
					{
						if(parseInt(currentRangeDiv.style.top)-currentRangeDiv.offsetHeight-1>y0)
		 					currentRangeDiv.style.top=parseInt(currentRangeDiv.style.top)-currentRangeDiv.offsetHeight-1;
		 				
						if(parseInt(currentRangeDiv.style.top)<=y0)
							currentRangeDiv.style.top=y0 + 1;
					}	
				
					currentRangeDiv.style.visibility="visible";
					lastRangeDiv = currentRangeDiv;
				}
				currentRangeDiv=null;	

	 		}		
		}
		lastRangeDiv = null;

		//Draw horizontal grid lines
		for(var y=(origin.y-y0)%range;y<=y1;y+=range)
		{
			if(y==origin.y)
			{
				if(y>=y0 && y<=y1)
					iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;z-index:-99;left:" + x0 + "px;top:" + y + "px;width:" + gridWidth + "px;height:1px;background-color:" + hexRangeColor + "\"></DIV>";
			}	
			else
		 		iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;z-index:-100;left:" + x0 + "px;top:" + y + "px;width:" + gridWidth + "px;height:1px;background-color:" + hexColor + "\"></DIV>";
	 		
			if(showRange && y!=origin.y && y>=y0 && y<y1)
			{	 		
	 			if(lastRangeDiv && lastRangeDiv.offsetTop + lastRangeDiv.offsetHeight < y)
	 			{
	 				if(lastRangeDiv.offsetHeight <= y1-y)
	 				{
	 					if(coordinateSystem=="cartecian")
		 					currentRangeDiv = drawRange(Math.round((origin.y-y)/scale),new jsPoint(x0+2+origin.x,y),rangeFont,rangeColor);
		 				else
		 					currentRangeDiv = drawRange(Math.round((y-origin.y)/scale),new jsPoint(x0+2+origin.x,y),rangeFont,rangeColor);
		 			}	
	 			}	
	 			else if(!lastRangeDiv)
	 			{
	 				if(coordinateSystem=="cartecian")
		 				currentRangeDiv = drawRange(Math.round((origin.y-y)/scale),new jsPoint(x0+2+origin.x,y),rangeFont,rangeColor);
		 			else	
		 				currentRangeDiv = drawRange(Math.round((y-origin.y)/scale),new jsPoint(x0+2+origin.x,y),rangeFont,rangeColor);
				}
				
				if(currentRangeDiv)
				{
					if(!isLeft)
					{
						if(parseInt(currentRangeDiv.style.left)+1+currentRangeDiv.offsetWidth < x1)
			 				currentRangeDiv.style.left=parseInt(currentRangeDiv.style.left)+1;
			 			else
							currentRangeDiv.style.left=x1-currentRangeDiv.offsetWidth-3;
					}
					else
					{
						if(parseInt(currentRangeDiv.style.left)-currentRangeDiv.offsetWidth-2 > x0)
			 				currentRangeDiv.style.left=parseInt(currentRangeDiv.style.left)-currentRangeDiv.offsetWidth-2;
			 			else
			 				currentRangeDiv.style.left=parseInt(currentRangeDiv.style.left)+1;
			 				
						if(parseInt(currentRangeDiv.style.left)<=x0)
							currentRangeDiv.style.left=x0 + 1;
					}
				
					currentRangeDiv.style.visibility="visible";
					
					//Hide the overlapping range.
					if(isUp && parseInt(currentRangeDiv.style.top)+currentRangeDiv.offsetHeight>origin.y-currentRangeDiv.offsetHeight && parseInt(currentRangeDiv.style.top)<origin.y)
						currentRangeDiv.style.visibility="hidden";

					if(isUp && parseInt(currentRangeDiv.style.top)>origin.y && parseInt(currentRangeDiv.style.top)<origin.y+currentRangeDiv.offsetHeight && parseInt(currentRangeDiv.style.top)>origin.y)
						currentRangeDiv.style.visibility="hidden";

					if(origin.y>y1 && parseInt(currentRangeDiv.style.top)+currentRangeDiv.offsetHeight>y1-currentRangeDiv.offsetHeight)
						currentRangeDiv.style.visibility="hidden";	

					if(!isUp && parseInt(currentRangeDiv.style.top)<origin.y+currentRangeDiv.offsetHeight && parseInt(currentRangeDiv.style.top)>origin.y)
						currentRangeDiv.style.visibility="hidden";
						
					if(!isUp && parseInt(currentRangeDiv.style.top)<origin.y && parseInt(currentRangeDiv.style.top)+currentRangeDiv.offsetHeight>origin.y && parseInt(currentRangeDiv.style.top)<origin.y)
					{
						alert(parseInt(currentRangeDiv.style.top));
						currentRangeDiv.style.visibility="hidden";
					}
					if(origin.y<y0 && parseInt(currentRangeDiv.style.top)<y0+currentRangeDiv.offsetHeight)
						currentRangeDiv.style.visibility="hidden";

					lastRangeDiv=currentRangeDiv;
				}
				currentRangeDiv = null;	

			}
		}

		gridDiv.innerHTML=gridDiv.innerHTML + iHtml.join("");
		
		//Internal function only to be used by showGrid method to draw the range value.
		function drawRange(text,point,font,color,align)
		{
	        var textDiv=document.createElement("div");

    	    textDiv.style.position="absolute";
        	textDiv.style.left=point.x + "px";
        	textDiv.style.top=point.y + "px";
        	textDiv.style.color=color.getHex();
        	textDiv.style.zIndex=-98;
			textDiv.style.visibility="hidden";

        	gridDiv.appendChild(textDiv);
                
        	//set font
        	if(font.family)
            	textDiv.style.fontFamily=font.family;

        	if(font.weight)
            	textDiv.style.fontWeight=font.weight;
        
        	if(font.size)
            	textDiv.style.fontSize=font.size;
        
        	if(font.style)
            	textDiv.style.fontStyle=font.style;
        
        	if(font.variant)
            	textDiv.style.fontVariant=font.variant;

            if(align) 
                textDiv.align=align;
        
	        textDiv.innerHTML=text;
    	    return textDiv;
    	}
	}

	//Clear the grid.
	function hideGrid()
	{
		gridDiv.innerHTML="";
		gridDiv.style.display="none";
	}
	
	//Draw Line between the 2 specified points based on Mid point Algorithm.
	function drawLine(pen,point0,point1)
	{
		//Check arguments for null values
		if(!pen || !point0 || !point1)
			return false;
			
	    var lineDiv=canvasDiv.appendChild(document.createElement("div"));
	    
	    //Some library functions use drawLine method and need to pass physical points only. So the following check.
	    if(arguments[3]!="physical") 
	    {
	    	phPoint0=logicalToPhysicalPoint(point0);
	   	    phPoint1=logicalToPhysicalPoint(point1);
   	    }
   	    else
   	    {
   	    	phPoint0=new jsPoint(point0.x,point0.y);
   	    	phPoint1=new jsPoint(point1.x,point1.y);
   	    }

	 	var x0, x1, y0, y1;
	 	x0=phPoint0.x;
	 	x1=phPoint1.x;
	 	y0=phPoint0.y;
	 	y1=phPoint1.y;
	 	
	 	var hexColor=pen.color.getHex();
   	 	//For Horizontal line
	 	if(y0==y1)
	 	{
	 		if(x0<=x1)
		 		lineDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y0 + "px;width:" + (x1-x0+1) + "px;height:" + pen.width + ";background-color:" + hexColor + "\"></DIV>";
	 		else if(x0>x1)
		 		lineDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + x1 + "px;top:" + y0 + "px;width:" + (x0-x1+1) + "px;height:" + pen.width + ";background-color:" + hexColor + "\"></DIV>";
		 		
	 		return lineDiv;
	 	}
	 	
	 	//For Vertical line
	 	if(x0==x1)
	 	{
	 		if(y0<=y1)
		 		lineDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y0 + "px;width:" + pen.width + ";height:" + (y1-y0+1) + "px;background-color:" + hexColor + "\"></DIV>";
	 		else if(y0>y1)
		 		lineDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y1 + "px;width:" + pen.width + ";height:" + (y0-y1+1) + "px;background-color:" + hexColor + "\"></DIV>";
		 		
	 		return lineDiv;
	 	}
		
	    var iHtml=new Array();
	 	var yArray=new Array();
	 	
	 	///Pixel Height Width Start
		var dx=Math.abs(x1-x0);
	 	var dy=Math.abs(y1-y0);
	 	var pixHeight,pixWidth;
	 	var penWidth=parseInt(pen.width);
	 	
	 	pixHeight=Math.round(Math.sqrt((penWidth*penWidth)/((dy*dy)/(dx*dx)+1)));
	 	pixWidth=Math.round(Math.sqrt(penWidth*penWidth-pixHeight*pixHeight));
	
	 	if(pixWidth==0)
	 	{
	 		pixWidth=1;
	 	}
	 	if(pixHeight==0)
	 	{
	 		pixHeight=1;
	 	}
	 	///Pixel Height Width End

	 	var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0); 
		if (steep)
		{   
			// swap   
			var tmp=x0;
			x0=y0;
			y0=tmp;
			tmp=x1;
			x1=y1;
			y1=tmp;
		}

		if (x0 > x1)
		{   
			// swap   
			var tmp=x0;
			x0=x1;
			x1=tmp;
			tmp=y0;
			y0=y1;
			y1=tmp;
		}
		
		var deltax = x1 - x0;
		var deltay = Math.abs(y1 - y0);
		var error  = deltax/2;
		var ystep;
		var y = y0;
		
		if (y0<y1) 
			ystep = 1; 
		else 
			ystep = -1;
			
		var xp,yp;
		var divWidth=0;
 		var divHeight=0;
 		if(steep)
 		{
 			divWidth=pixWidth;
 		}
 		else
 		{
 			divHeight=pixHeight;
 		}
		for (x=x0;x<=x1;x++)
		{
   			if (steep)
   			{ 
   				if(x==x0)
   				{
   					xp=y;
   					yp=x;
   				}
   				else
   				{
   					if(y==xp)
   					{
   						divHeight=divHeight+ 1;
   					}
   					else
   					{
   						divHeight=divHeight+pixHeight;
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
 						divHeight=0;		
 						xp=y;
	   					yp=x;		
 					}
 				}
 				
 				if(x==x1)
 				{
 					if(divHeight!=0)
 					{
 						divHeight=divHeight+pixHeight;
 						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
 					}
 					else
 					{
 						divHeight=pixHeight;
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + y + "px;top:" + x + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
 					}
 				}
 			}
			else
			{ 
				if(x==x0)
   				{
   					xp=x;
   					yp=y;
   				}
   				else
   				{
   					if(y==yp)
   					{
   						divWidth=divWidth + 1;
   					}
   					else
   					{
   						divWidth=divWidth+pixWidth;
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
	 					divWidth=0;
 						xp=x;
 						yp=y;			
 					}
 				}	
 				if(x==x1)
 				{
 					if(divWidth!=0)
 					{
   						divWidth=divWidth+pixWidth;
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
 					}
 					else
 					{
 						divWidth=pixWidth;
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + x + "px;top:" + y + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
 					}
 				}
 			}

   			error = error - deltay;
   			if (error < 0)
			{     
				y = y + ystep;
     			error = error + deltax;
   			}
 		}
 		
 		lineDiv.innerHTML=iHtml.join("");
 		return lineDiv;
	}
	
	//Private function returns array of x coordinates for y values
	//for a line (algorithm same as drawLine method). 
	//Used by drawArc, fillArc and fillPolygon methods.
	function getLinePixels(point0,point1)
	{
		function xData()
		{
			this.xMax=0;
			this.xMin=0;
			this.isVertex=false;
		}
		
	 	var x0, x1, y0, y1;
	 	x0=point0.x;
	 	x1=point1.x;
	 	y0=point0.y;
	 	y1=point1.y;
	 	var xDataArray=new Array();
	 	var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0); 
		if (steep)
		{   
			// swap   
			var tmp=x0;
			x0=y0;
			y0=tmp;
			tmp=x1;
			x1=y1;
			y1=tmp;
		}

		if (x0 > x1)
		{   
			// swap   
			var tmp=x0;
			x0=x1;
			x1=tmp;
			tmp=y0;
			y0=y1;
			y1=tmp;
		}

		var deltax = x1 - x0;
		var deltay = Math.abs(y1 - y0);
		var error  = deltax/2;
		var ystep;
		var y = y0;
		
		if (y0<y1) 
			ystep = 1; 
		else 
			ystep = -1;
			
		for (x=x0;x<=x1;x++)
		{
   			if (steep)
   			{ 
		   		xDataArray[x]=new xData();
		   		xDataArray[x].xMin=y;
		   		xDataArray[x].xMax=y;
		   		
		   		if(x==x0 && y==y0)
		   			xDataArray[x].isVertex=true;	
 			}
			else
			{ 
				if(!xDataArray[y])
				{
					xDataArray[y]=new xData();
					xDataArray[y].xMin=x;
			   		xDataArray[y].xMax=x;
			   		
			   		if(x==x0 && y==y0)
			   			xDataArray[y].isVertex=true;	
				}
				else
				{
					xDataArray[y].xMax=x;
				}
 			}

   			error = error - deltay;
   			if (error < 0)
			{     
				y = y + ystep;
     			error = error + deltax;
   			}
 		}
		return xDataArray;
	}

    //Draw rectangle at specified point with specified width and height.	
    function drawRectangle(pen,point,width,height)
    {
	    //Check arguments for null values
	    if(!pen || !point || !width || !height)
		    return false;
    		
	    width=Math.round(width*scale);
	    height=Math.round(height*scale);
    	
        var rectDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();
        
        var penWidth=parseInt(pen.width);
        var hexColor=pen.color.getHex(); 
        
        //If pen width is less than height or width specified use fillRectangle method
        if(penWidth>=height || penWidth>=width)
    	    return this.fillRectangle(pen.color,point,width,height);
        	
        phPoint=logicalToPhysicalPoint(point);
        
        //Draw 4 sides of the rectangle.
        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + phPoint.x + "px;top:" + phPoint.y + "px;width:" + width +  "px;height:" + penWidth + "px;background-color:" + hexColor + "\"></DIV>";
        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + phPoint.x + "px;top:" + (phPoint.y+height-penWidth) + "px;width:" + width +  "px;height:" + penWidth + "px;background-color:" + hexColor + "\"></DIV>";
        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + phPoint.x + "px;top:" + (phPoint.y+penWidth) + "px;width:" + penWidth +  "px;height:" + (height-2*penWidth+1) + "px;background-color:" + hexColor + "\"></DIV>";
        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (phPoint.x+width-penWidth) + "px;top:" + (phPoint.y+penWidth) + "px;width:" + penWidth +  "px;height:" + (height-2*penWidth+1) + "px;background-color:" + hexColor + "\"></DIV>";
        
  	    rectDiv.innerHTML=iHtml.join("");
  	    return rectDiv;
    }

    //Draw color filled rectangle at specified point with specified color, width and height
    function fillRectangle(color,point,width,height)
    {
	    //Check arguments for null values
	    if(!color || !point || !width || !height)
		    return false;

	    width=Math.round(width*scale);
	    height=Math.round(height*scale);
    	
        var rectDiv=canvasDiv.appendChild(document.createElement("div"));
        phPoint=logicalToPhysicalPoint(point);

        var hexColor=color.getHex();
        
        //Draw a single div element
  	    rectDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + phPoint.x + "px;top:" + phPoint.y + "px;width:" + width +  "px;height:" + height + "px;background-color:" + hexColor + "\"></DIV>";
  	    return rectDiv;
    }

    //This is a private function to draw an ellipse with width 1px.
    //It is used by drawEllipse method. 
    //Mid point algorithm is used for the drawing
    function drawEllipseSingle(pen,center,width,height)
    {
   	    //Check arguments for null values
	    if(!pen || !center || !width || !height)
		    return false;
        
        var ellipseDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();

        var penWidth=parseInt(pen.width);
        var hexColor=pen.color.getHex();
        
	    var a=Math.round(width/2);
	    var b=Math.round(height/2);
	    var xc=center.x;
	    var yc=center.y;

	    var x=0;
	    var y=b;
	    var a2=a*a;
	    var b2=b*b;
    	
	    var yp=y;
	    var xp=x;
	    var divWidth;
	    var divHeight;
    	
 	    while(b2*x < a2*y)
  	    {     
  		    x++;    
 		    if((b2*x*x + a2*(y-0.5)*(y-0.5) - a2*b2) >=0)  
 			    y--;    
    		
		    if(x==1 && y!=yp)
		    {
		        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+x) + "px;top:" + (yc+y) + "px;width:1px;height:1px;background-color:" + hexColor + "\"></DIV>";
		        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+x) + "px;top:" + (yc-y) + "px;width:1px;height:1px;background-color:" + hexColor + "\"></DIV>";
		    }
      	    if(y!=yp)
      	    {
			    divWidth=x-xp;
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+xp) + "px;top:" + (yc+yp-penWidth+1) + "px;height:" + penWidth + "px;width:" + divWidth + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp-divWidth+1) + "px;top:" + (yc+yp-penWidth+1) + "px;height:" + penWidth + "px;width:" + divWidth + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+xp) + "px;top:" + (yc-yp) + "px;height:" + penWidth + "px;width:" + divWidth + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp-divWidth+1) + "px;top:" + (yc-yp) + "px;height:" + penWidth + "px;width:" + divWidth + "px;background-color:" + hexColor + "\"></DIV>";

			    yp=y;
			    xp=x;
		    }
    		
		    if(b2*x >= a2*y)
		    {
			    divWidth=x-xp+1;
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+xp) + "px;top:" + (yc+yp-penWidth+1) + "px;height:" + penWidth + "px;width:" + divWidth + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp-divWidth+1) + "px;top:" + (yc+yp-penWidth+1) + "px;height:" + penWidth + "px;width:" + divWidth + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+xp) + "px;top:" + (yc-yp) + "px;height:" + penWidth + "px;width:" + divWidth + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp-divWidth+1) + "px;top:" + (yc-yp) + "px;height:" + penWidth + "px;width:" + divWidth + "px;background-color:" + hexColor + "\"></DIV>";
		    }
	    }

  	    yp=y;
	    xp=x;
    	
	    while(y!=0)  
	    {
		    y--;   
  		    if((b2*(x+0.5)*(x+0.5) + a2*y*y - a2*b2)<=0)   
     		    x++;
    		
     	    if(x!=xp)
     	    {
			    divHeight=yp-y;
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+xp-penWidth+1) + "px;top:" + (yc+yp-divHeight+1) + "px;width:" + penWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+xp-penWidth+1) + "px;top:" + (yc-yp) + "px;width:" + penWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc+yp-divHeight+1) + "px;width:" + penWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc-yp) + "px;width:" + penWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    			
			    xp=x;
			    yp=y;
		    }
    		
     	    if(y==0)
     	    {
			    divHeight=yp-y+1;
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+xp-penWidth+1) + "px;top:" + (yc+yp-divHeight+1) + "px;width:" + penWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc+xp-penWidth+1) + "px;top:" + (yc-yp) + "px;width:" + penWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc+yp-divHeight+1) + "px;width:" + penWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc-yp) + "px;width:" + penWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    			
			    xp=x;
			    yp=y;
		    }

 	    }
     	
 	    ellipseDiv.innerHTML=iHtml.join("");
 	    return ellipseDiv;
    }

    //Draw ellipse with specified center, width and height.
    //Mid point algorithm is used for basic drawing.  
    function drawEllipse(pen,center,width,height)
    {
	    //Check arguments for null values
	    if(!pen || !center || !width || !height)
		    return false;
    		
	    width*=scale;
	    height*=scale;

        var ellipseDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();
        
        phCenter=logicalToPhysicalPoint(center);

	    var penWidth=parseInt(pen.width);
	    if(penWidth<=1)
	    {
		    return drawEllipseSingle(pen,phCenter,width,height);
	    }
    	
	    var hexColor=pen.color.getHex();
    	
	    var a=Math.round(width/2);
	    var b=Math.round(height/2);
	    var xc=phCenter.x;
	    var yc=phCenter.y;
    	
	    //For inner ellipse
	    var ai=a-penWidth + 1;
	    var bi=b-penWidth + 1;
    	
	    //For drawing ellipse having width more than 1px, inner ellipse is required to be considered
	    var res=getInnerEllipse(phCenter,ai*2,bi*2)
    	
	    var xArray=res[0];
	    var xArrayI=res[1];
    	
	    var yi=bi;
	    var ai2=ai*ai;
	    var bi2=bi*bi;
    	
	    var x=0;
	    var y=b;
	    var a2=a*a;
	    var b2=b*b;
    	
	    var xp,yp;
    	
	    xp=1;
	    yp=y;
	    var ypi=yi;
    	
	    var xT;
	    var divWidth;
	    var divHeight=1;
    	
 	    while(b2*x < a2*y)
  	    {     
  		    x++;    
 		    if((b2*x*x + a2*(y-0.5)*(y-0.5) - a2*b2) >=0)  
 			    y--;    
    		
		    if(y+1<bi)
		    {
 			    if(y!=yp)
			    {
				    xT=xc-x+1;
				    divWidth=(x-1)+1-xArray[yp];
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc-yp) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc+yp) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";

				    xT=xT+2*(x-1)+1-divWidth;
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc-yp) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc+yp) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				
				    yp=y;		
				    xp=x;
			    }
			    //Last step in loop
			    if(b2*x >= a2*y)
			    {
				    xT=xc-x;
				    divWidth=x+1-xArray[yp];
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc-y) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc+y) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				
				    xT=xT+2*x+1-divWidth;
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc-y) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc+y) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }	 		
		    else
		    {
      		    if(x==1 && y!=yp) //Topmost and bottom most points, to be tested
      		    {
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;width:1px;height:1px;left:" + xc + "px;top:" + (yc+yp-1) + "px;background-color:" + hexColor + "\"></DIV>";
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;width:1px;height:1px;left:" + xc + "px;top:" + (yc-yp) + "px;background-color:" + hexColor + "\"></DIV>";      		
			    }
			    if(y!=yp)
			    {
   				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-x+1) + "px;top:" + (yc-yp) + "px;width:" + (2*(x-1)+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-x+1) + "px;top:" + (yc+yp) + "px;width:" + (2*(x-1)+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				    yp=y;
			    }
    					
			    //Last step in loop
			    if(y==bi || y==0)
			    {
  				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-x) + "px;top:" + (yc-y) + "px;width:" + (2*x+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-x) + "px;top:" + (yc+y) + "px;width:" + (2*x+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }
	    }
    	  
	    xp=x;
	    yp=y;
	    divHeight=1;
	    var xpi=xArray[y];

	    while(y!=0)  
	    {     
		    y--;   
  		    if((b2*(x+0.5)*(x+0.5) + a2*y*y - a2*b2)<=0)   
     		    x++;
    		
			    if(y+1<bi)
			    {
				    if(x!=xp || xArray[y]!=xpi)
				    {
					    divHeight=yp-y;
    					
					    xT=xc-xp;
					    divWidth=xp+1-xArray[y+1];
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc-yp) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc+y+1) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				
					    xT=xT+2*xp+1-divWidth;
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc-yp) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc+y+1) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				
					    xp=x;
					    yp=y;
					    xpi=xArray[y];
				    }
    		
				    //Last step in loop
				    if(y==0)
				    {
					    divHeight=yp-y+1;

					    xT=xc-x;
					    divWidth=x+1-xArray[y];
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc-yp) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc+y) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				
					    xT=xT+2*x+1-divWidth;
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc-yp) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xT + "px;top:" + (yc+y) + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
        				
    				    xp=x;
					    yp=y;
					    xpi=xArray[y];
				    }
			    }
			    else
			    {
				    if(x!=xp)
				    {
					    divHeight=yp-y;
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc-yp) + "px;width:" + (2*xp+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc+y+1) + "px;width:" + (2*xp+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";

					    xp=x;
					    yp=y;
					    xpi=xArray[y];
				    }
    		
				    //Last step in loop
				    if(y==bi || y==0)
				    {
				        divHeight=yp-y+1;
    				    
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-x) + "px;top:" + (yc-yp) + "px;width:" + (2*x+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-x) + "px;top:" + (yc+y) + "px;width:" + (2*x+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
        				
					    xp=x;
					    yp=y;
					    xpi=xArray[y];
				    }
			    }	
 		    }
     		
 		    ellipseDiv.innerHTML=iHtml.join("");
 		    return ellipseDiv;
    }

    //For ellipse having width more than 1 px, get the coordinates for inner ellipse.
    function getInnerEllipse(center,w,h)
    {
	    var a=Math.round(w/2);
	    var b=Math.round(h/2);
	    var xc=center.x;
	    var yc=center.y;
    	
	    xArray=new Array();
	    xArrayI=new Array();

	    var x=0;
	    var y=b;
	    var a2=a*a;
	    var b2=b*b;
    	
	    xArray[y]=x;
	    xArrayI[y]=x;
    	
	    var divWidth;
	    var divHeight;
    	
	    //Upper and Lower portions of the ellipse
 	    while(b2*x < a2*y)
  	    {     
  		    x++;    
 		    if((b2*x*x + a2*(y-0.5)*(y-0.5) - a2*b2) >=0)  
 			    y--;    
      	    if(!xArray[y])
		    xArray[y]=x;
    		
		    xArrayI[y]=x;
	    }
    	
	    //Left and Right portions of the ellipse
	    while(y!=0)  
	    {     
		    y--;   
  		    if((b2*(x+0.5)*(x+0.5) + a2*y*y - a2*b2)<=0)   
     		    x++;

   		    xArray[y]=x;
   		    xArrayI[y]=x;
 	    }
 	    return new Array(xArray,xArrayI);
    }

    //Draw circle with specified center and radius.
    //Uses drawEllipse method only.
    function drawCircle(pen,center,radius)
    {
   	    //Check arguments for null values
	    if(!pen || !center || !radius)
		    return false;
    		
        return drawEllipse(pen,center,2*radius,2*radius);
    }

    //Draw circle filled with the specified color alongwith specified center and radius.
    //Uses drawEllipse method only.
    function fillCircle(color,center,radius)
    {
   	    //Check arguments for null values
	    if(!color || !center || !radius)
		    return false;
    		
        return fillEllipse(color,center,2*radius,2*radius);
    }

    //Draw ellipse filled with specified color and other parameters, center, width and height.
    //Mid point algorithm is used for basic ellipse drawing.  
    function fillEllipse(color,center,width,height)
    {
	    //Check arguments for null values
	    if(!color || !center || !width || !height)
		    return false;
    		
	    width*=scale;
	    height*=scale;

        var ellipseDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();

        phCenter=logicalToPhysicalPoint(center);

	    var a=Math.round(width/2);
	    var b=Math.round(height/2);
	    var xc=phCenter.x;
	    var yc=phCenter.y;
	    var hexColor=color.getHex();
    	
	    var x=0;
	    var y=b;
	    var a2=a*a;
	    var b2=b*b;
    	
	    var xp,yp;
    	
	    xp=1;
	    yp=y;
    	
	    //Upper and Lower portion of the ellipse
 	    while(b2*x < a2*y)
  	    {     
  		    x++;    
 		    if((b2*x*x + a2*(y-0.5)*(y-0.5) - a2*b2) >=0)  
 			    y--;    
     			
      	    if(x==1 && y!=yp) //Topmost and bottom most points, to be tested
      	    {
          	
      		    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;width:1px;height:1px;left:" + xc + "px;top:" + (yc+yp-1) + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;width:1px;height:1px;left:" + xc + "px;top:" + (yc-yp) + "px;background-color:" + hexColor + "\"></DIV>";

      	    }
		    if(y!=yp)
		    {
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;height:1px;left:" + (xc-x+1) + "px;top:" + (yc-yp) + "px;width:" + (2*x-1) + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;height:1px;left:" + (xc-x+1) + "px;top:" + (yc+yp) + "px;width:" + (2*x-1) + "px;background-color:" + hexColor + "\"></DIV>";

			    yp=y;
			    xp=x;		
		    }
    			
    		
		    //Last step in loop
		    if(b2*x >= a2*y)
		    {
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;height:1px;left:" + (xc-x) + "px;top:" + (yc-yp) + "px;width:" + (2*x+1) + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;height:1px;left:" + (xc-x) + "px;top:" + (yc+yp) + "px;width:" + (2*x+1) + "px;background-color:" + hexColor + "\"></DIV>";
		    }
	    }
    	  
	    xp=x;
	    yp=y;
	    var divHeight=1;

	    //Left and Right portion of the ellipse
	    while(y!=0)  
	    {     
		    y--;   
  		    if((b2*(x+0.5)*(x+0.5) + a2*y*y - a2*b2)<=0)   
     		    x++;
    		
		    if(x!=xp)
		    {
			    divHeight=yp-y;
    			
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc-yp) + "px;width:" + (2*xp+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc+y+1) + "px;width:" + (2*xp+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    			
			    xp=x;
			    yp=y;
		    }
    		
		    //Last step in loop
		    if(y==0)
		    {
			    divHeight=yp-y+1;
    			
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc-yp) + "px;width:" + (2*x+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + (xc-xp) + "px;top:" + (yc+y) + "px;width:" + (2*x+1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
		    }
 	    }
     	
 	    ellipseDiv.innerHTML=iHtml.join("");
 	    return ellipseDiv;
    }

    //Draw arc filled with specified color, center, width, height, start angle and swap angle. 
    function fillArc(color,center,width,height,startAngle,swapAngle)
    {
	    //Check arguments for null values 
	    if(!color || !center || !width || !height || startAngle==null || swapAngle==null)
		    return false;

	    width*=scale;
	    height*=scale;
      
        if(swapAngle==0)
        return;
        
        var arcDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();
        
        phCenter=logicalToPhysicalPoint(center);
        
	    var saD; //arc start angle degrees.
	    if(startAngle>360)
	        saD=startAngle%360;
	    else
	        saD=startAngle;
    	 
	    var swD; //swap angle in degrees.
	    if(swapAngle>360)
	        swD=swapAngle%360;
	    else
	        swD=swapAngle;
    	    
	    var eaD; //arc end angle degrees.
	    eaD=parseFloat(saD)+parseFloat(swD);
	    if(eaD>360)
	        eaD=eaD%360; 

	    //For cartecian coordinate system.
	    if(coordinateSystem=="cartecian")    
	    {
		    saD=360-saD;
		    eaD=360-eaD;
		    var tempAD;
		    tempAD=saD;
		    saD=eaD;
		    eaD=tempAD;
	    }

	    var x1,y1,x2,y2;
	    var saR=saD*Math.PI/180;
	    var swR=swD*Math.PI/180;
	    var eaR=eaD*Math.PI/180;
    	
	    //For start angle
	    if((saD<=45 && saD>=0) || (saD>=135 && saD<=225) || (saD>=315 && saD<=360))
	    {
	        if(saD>=90 && saD<=270) 
	        {
	            y1=Math.round(phCenter.y-Math.tan(saR)*width/2);
		    x1=Math.round(phCenter.x-width/2);
		}
		else 
		{
		    y1=Math.round(phCenter.y+Math.tan(saR)*width/2);
		    x1=Math.round(phCenter.x+width/2);
		}
	    }
	    else
	    {
	        if(saD>=0 && saD<=180) 
	        {
	            x1=Math.round(phCenter.x+(1/Math.tan(saR))*height/2);
		    y1= Math.round(phCenter.y+height/2);
		}
		else 
		{
		    x1=Math.round(phCenter.x-(1/Math.tan(saR))*height/2);
		    y1=Math.round(phCenter.y-height/2);
		 }
	    }
    	
	    //For end angle
	    if((eaD<=45 && eaD>=0) || (eaD>=135 && eaD<=225) || (eaD>=315 && eaD<=360))
	    {
	        if (eaD>= 90 && eaD<=270) 
	        {
	            y2=Math.round(phCenter.y-Math.tan(eaR)*width/2);
	            x2=Math.round(phCenter.x-width/2);
	        }
	        else 
	        {
	            y2=Math.round(phCenter.y+Math.tan(eaR)*width/2);
	            x2=Math.round(phCenter.x+width/2);
	        }
	    }
	    else {
	        if(eaD>=0 && eaD<=180) 
	        {
	            x2=Math.round(phCenter.x+(1/Math.tan(eaR))*height/2);
	            y2=Math.round(phCenter.y+height/2);
	        }
	        else 
	        {
	            x2=Math.round(phCenter.x-(1/Math.tan(eaR))*height/2);
	            y2=Math.round(phCenter.y-height/2);
	        }
	    }
    	
	    //Get the pixel arrays for the lines croping the ellipse to form an arc.
	    xDataArraySa=getLinePixels(phCenter,new jsPoint(x1,y1));
	    xDataArrayEa=getLinePixels(phCenter,new jsPoint(x2,y2));
    	
	    var hexColor=color.getHex();

	    var a=Math.round(width/2);
	    var b=Math.round(height/2);
	    var xc=phCenter.x;
	    var yc=phCenter.y;
    	
	    var x=0;
	    var y=b;
	    var a2=a*a;
	    var b2=b*b;
    	
	    var xp,yp;
	    var divX1,divX1pU,divX1pD,divX2,divX2pU,divX2pD,divY1,divY2,saX,eaX,saXp,eaXp,xpU,xpD,ypU,ypD;
	    var divWidthOrg,divWidth1,divWidth2,divWidth3,divWidth4,divWidth1p,divWidth2p,divWidth3p,divWidth4p,divHeight;
	    var draw1p,draw2p,draw3p,draw4p;
    	
	    xp=1;
	    yp=y;
    	
	    //Upper and lower portion of the ellipse constutuing the arc
 	    while(b2*x < a2*y)
  	    {     
  		    x++;    
 		    if((b2*x*x + a2*(y-0.5)*(y-0.5) - a2*b2) >=0)  
 			    y--;    
     			
      	    if(x==1 && y!=yp) //Topmost and bottom most points, to be tested
      	    {
      		    divY1=yc+yp-1;
			    divY2=yc-yp;
			    divWidthOrg=1;
			    divWidth1=divWidthOrg;
			    divWidth2=divWidthOrg;
			    divWidth3=divWidthOrg;
			    divWidth4=divWidthOrg;
			    divX1=xc;
    			
			    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
			    {
				    fillArcSegOut(true);
				    if(eaD<=saD)
				    fillArcSegOut(false);
			    }
			    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
			    {
				    fillArcSegOut(false);
				    if(eaD<=saD)
				    fillArcSegOut(true);
			    }
			    else
			    {
				    fillArcSegOut(true);
				    fillArcSegOut(false);
			    }
      	    }
		    else if(y!=yp)
		    {
			    divY1=yc+yp;
			    divY2=yc-yp;
			    divWidthOrg=2*(x-1)+1;
			    divWidth1=divWidthOrg;
			    divWidth2=divWidthOrg;
			    divWidth3=divWidthOrg;
			    divWidth4=divWidthOrg;
			    divX1=xc-x+1;
    			
			    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
			    {
				    fillArcSegOut(true);
				    if(eaD<=saD)
				    fillArcSegOut(false);
			    }
			    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
			    {
				    fillArcSegOut(false);
				    if(eaD<=saD)
				    fillArcSegOut(true);
			    }
			    else
			    {
				    fillArcSegOut(true);
				    fillArcSegOut(false);
			    }	
    			
			    yp=y;
			    xp=x;
		    }
    				
    		
		    //Last step in loop
		    if(b2*x >= a2*y)
		    {
			    divY1=yc+yp;
			    divY2=yc-yp;
			    divWidthOrg=2*x+1;
			    divWidth1=divWidthOrg;
			    divWidth2=divWidthOrg;
			    divWidth3=divWidthOrg;
			    divWidth4=divWidthOrg;
			    divX1=xc-x;
    			
			    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
			    {
				    fillArcSegOut(true);
				    if(eaD<=saD)
				    fillArcSegOut(false);
			    }
			    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
			    {
				    fillArcSegOut(false);
				    if(eaD<=saD)
				    fillArcSegOut(true);
			    }
			    else
			    {
				    fillArcSegOut(true);
				    fillArcSegOut(false);
			    }
		    }
    		
	    }
    	  
        xp=x;
	    yp=y;
	    divHeight=1;

	    //Similar code as in next while loop for first y before the loop. Only values are retrieved and no drawing.
    	    			
	    divY1=yc+y;
	    divY2=yc-y;
	    divWidthOrg=2*x+1;
	    divWidth1=divWidthOrg;
	    divWidth2=divWidthOrg;
	    divWidth3=divWidthOrg;
	    divWidth4=divWidthOrg;
	    divX1=xc-x;
    	
	    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
	    {
		    xDataArrayEa.pop();				
		    fillArcSegIn(true,true);
		    if(eaD<=saD)
		    fillArcSegIn(false,true);
	    }				
	    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
	    {
		    xDataArrayEa.pop();				
		    if(y!=0)
			    fillArcSegIn(false,true);
		    if(eaD<=saD)
		        fillArcSegIn(true,true);
	    }
	    else
	    {
		    if(saD>=180 && saD<360)
			    xDataArraySa.pop();
		    else
			    xDataArrayEa.pop();
    		

		    fillArcSegIn(true,true);
		    if(y!=0)
		    {
			    divX1=xc-x;
			    fillArcSegIn(false,true);
		    }
	    }

	    //Left and Right portion of the ellipse ellipse constutuing the arc.
	    while(y!=0)  
	    {
		    y--;   
		    if((b2*(x+0.5)*(x+0.5) + a2*y*y - a2*b2)<=0)   
 			    x++;
     
		    divY1=yc+y;
		    divY2=yc-y;
		    divWidthOrg=2*x+1;
		    divWidth1=divWidthOrg;
		    divWidth2=divWidthOrg;
		    divWidth3=divWidthOrg;
		    divWidth4=divWidthOrg;
		    divX1=xc-x;
			
		    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
		    {
			    fillArcSegIn(true);
			    if(eaD<=saD)
			    fillArcSegIn(false);
		    }				
		    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
		    {
			    if(y!=0)
				    fillArcSegIn(false);
			    if(eaD<=saD)
				    fillArcSegIn(true);
		    }
		    else
		    {
			    fillArcSegIn(true);
			    if(y!=0)
			    {
				    divX1=xc-x;
				    fillArcSegIn(false);
			    }	
		    }
 	    }
     	
 	    arcDiv.innerHTML=iHtml.join("");
 	    return arcDiv;

	    //Internal function: Arc segment for left and right portion of the ellipse constutuing the arc.
	    function fillArcSegIn(isUpperHalf,valueOnly)
	    {
		    var divY;
		    var xDataArray1,xDataArray1;
		    var divWidthFirst=divWidthOrg;
		    var divWidthSecond=divWidthOrg;
		    var drawFirst=false;
		    var drawSecond=false;
    		
		    if(isUpperHalf)
		    {
			    var draw1=false; //upper half (in all comments upper & lower are in context of cartecian system)
			    var draw3=false; //upper half second
			    divY=divY1;
			    xDataArray1=xDataArraySa;
			    xDataArray2=xDataArrayEa;
			    saDvar=saD;
			    eaDvar=eaD;
		    }
		    else
		    {
			    var draw2=false; //lower half
			    var draw4=false; //lower half second
			    divY=divY2;
			    xDataArray2=xDataArraySa;
			    xDataArray1=xDataArrayEa;
			    saDvar=360-eaD;
			    eaDvar=360-saD;
		    }
		    if(eaDvar>saDvar)
		    {
			    if(xDataArray2[divY] && divX1+divWidthOrg>=xDataArray2[divY].xMin && divX1<=xDataArray2[divY].xMin)
			    {
				    eaX=xDataArray2[divY].xMin;
				    if(xDataArray1[divY] && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
				    {
					    saX=xDataArray1[divY].xMax+1;
					    divWidthFirst=saX-eaX;
				    }
				    else
				    {
					    divWidthFirst=divX1+divWidthOrg-eaX;
				    }
				    divX1=eaX;
				    drawFirst=true;
			    }
			    else if(xDataArray1[divY] && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
			    {
				    saX=xDataArray1[divY].xMax+1;
				    divWidthFirst=saX-divX1;
				    drawFirst=true;
			    }
			    else if(eaDvar>90 && saDvar<90)
			    {
				    drawFirst=true;
			    }
		    }
		    else //saDvar>=eaDvar
		    {
			    if(xDataArray1[divY] && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
			    {
				    saX=xDataArray1[divY].xMax+1;
				    divWidthFirst=saX-divX1;
				    drawFirst=true;
			    }
			    else if(eaDvar<90 && saDvar<90)
			    {
				    drawFirst=true;
			    }
    	
			    if(xDataArray2[divY] && divX1+divWidthOrg>=xDataArray2[divY].xMin && divX1<=xDataArray2[divY].xMin)
			    {
				    divX2=xDataArray2[divY].xMin;
				    divWidthSecond=divWidthOrg-xDataArray2[divY].xMin+divX1;
				    drawSecond=true;
			    }
			    else if(eaDvar>90 && saDvar>90)
			    {
				    divX2=divX1;
				    divWidthSecond=divWidthOrg;
				    drawSecond=true;
			    }
		    }
    		
		    if(isUpperHalf)
		    {
			    if(drawFirst)
				    draw1=true;
    			
			    if(drawSecond)
				    draw3=true;
    				
			    divWidth1=divWidthFirst;
			    divWidth3=divWidthSecond;	
		    }
		    else
		    {
			    if(drawFirst)
				    draw2=true;
    			
			    if(drawSecond)
				    draw4=true;
    				
			    divWidth2=divWidthFirst;
			    divWidth4=divWidthSecond;	
		    }
    		
		    if(saD>=0 && saD<180 && eaD>=0 && eaD<180 && saD>eaD)
		    {
			    draw2=true;
		    }				
		    else if(saD>=180 && saD<360 && eaD>=180 && eaD<360 && saD>eaD)
		    {
			    draw1=true;
		    }
    		
		    if(!divX2)
		    divX2="";
		    if(!divX1)
		    divX1="";
    		
		    if(!valueOnly)
		    {
			    if(isUpperHalf)
			    {
				    if(x!=xpU || divX1pU!=divX1 || divX2pU!=divX2 || divWidth1!=divWidth1p || divWidth3!=divWidth3p)
				    {
					    divHeight=ypU-y;
					    if(draw3p)
					    {
						    if(divX2pU!=null)
							    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2pU + "px;top:" + (divY1+1) + "px;width:" + divWidth3p + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					    }
					    if(draw1p)
					    {
						    if(divX1pU!=null)
							    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1pU + "px;top:" + (divY1+1) + "px;width:" + divWidth1p + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					    }
    					
					    if(draw1p||draw3p)	
					    {
						    divX1pU=divX1;
    					
						    draw1p=draw1;
						    draw3p=draw3;
						    xpU=x;
						    ypU=y;
    					
						    divWidth1p=divWidth1;
						    divWidth3p=divWidth3;
						    divX2pU=divX2;
					    }
				    }
			    }	
			    else
			    {
				    if(x!=xpD || divX1pD!=divX1 || divX2pD!=divX2 || divWidth2!=divWidth2p || divWidth4!=divWidth4p)
				    {
					    divHeight=ypD-y;
					    if(draw4p)
					    {
						    if(divX2pD!=null)
							    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2pD + "px;top:" + (divY2-divHeight) + "px;width:" + divWidth4p + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					    }
					    if(draw2p)
					    {
						    if(divX1pD!=null) 
							    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1pD + "px;top:" + (divY2-divHeight) + "px;width:" + divWidth2p + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					    }
					    if(draw2p||draw4p)
					    {
						    divX1pD=divX1;
    					
						    draw2p=draw2;
						    draw4p=draw4;

						    xpD=x;
						    ypD=y;
    					
						    divWidth2p=divWidth2;
						    divWidth4p=divWidth4;
						    divX2pD=divX2;
					    }
				    }
			    }			
		    }
    		
		    //To get only values; used for first y value before loop. 
		    if(valueOnly)
		    {
			    if(isUpperHalf)
			    {
				    draw1p=draw1;
				    draw3p=draw3;
    				
				    if(draw1p)
				    divX1pU=divX1;
    				
				    if(draw3p)
				    divX2pU=divX2;
    				
				    if(draw1p||draw3p)
				    {
				        ypU=y;
				        xpU=x;
				    }
				    else
				    {
				        ypU=0;
				        xpU=0;
				    }
    				
				    divWidth1p=divWidth1;
				    divWidth3p=divWidth3;
			    }
			    else
			    {
				    draw2p=draw2;
				    draw4p=draw4;

				    if(draw2p)
				    divX1pD=divX1;
    				
				    if(draw4p)
				    divX2pD=divX2;
    				
				    if(draw2p||draw4p)
				    {
				        ypD=y;
				        xpD=x;
				    }
				    else
				    {
				        ypD=0;
				        xpD=0;
				    }
    				
				    divWidth2p=divWidth2;
				    divWidth4p=divWidth4;
			    }
		    }
    		
		    if(!isUpperHalf)
		    {
			    draw2p=draw2;
			    draw4p=draw4;
		    }
		    else
		    {
			    draw1p=draw1;
			    draw3p=draw3;
		    }
    		
		    if(y==1 && !isUpperHalf)
		    {
			    divHeight=ypD-y+1;
			    if(draw4)
			    {
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2 + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth4 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
			    if(draw2)
			    {
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1 + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth2 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }
		    if(y==0 && isUpperHalf)
		    {	
			    divHeight=ypU-y+1;
			    if(draw3)
			    {
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2 + "px;top:" + (divY1) + "px;width:" + divWidth3 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
			    if(draw1)
			    {
				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1 + "px;top:" + (divY1) + "px;width:" + divWidth1 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }		
	    }
    	
	    //Internal function: Arc segment for upper and lower portion of the ellipse constutuing the arc.
	    function fillArcSegOut(isUpperHalf)
	    {
		    var divY;
		    var xDataArray1,xDataArray1;
		    var divWidthFirst=divWidthOrg;
		    var divWidthSecond=divWidthOrg;
		    var drawFirst=false;
		    var drawSecond=false;
    		
		    if(isUpperHalf)
		    {
			    var draw1=false; //upper half
			    var draw3=false; //upper half second
			    divY=divY1;
			    xDataArray1=xDataArraySa;
			    xDataArray2=xDataArrayEa;
			    saDvar=saD;
			    eaDvar=eaD;
		    }
		    else
		    {
			    var draw2=false; //lower half
			    var draw4=false; //lower half second
			    divY=divY2;
			    xDataArray2=xDataArraySa;
			    xDataArray1=xDataArrayEa;
			    saDvar=360-eaD;
			    eaDvar=360-saD;
		    }
		    if(eaDvar>saDvar)
		    {
			    if(xDataArray2[divY]!=null && divX1+divWidthOrg>=xDataArray2[divY].xMin && divX1<=xDataArray2[divY].xMin)
			    {
				    eaX=xDataArray2[divY].xMin;
				    if(xDataArray1[divY]!=null && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
				    {
					    saX=xDataArray1[divY].xMax+1;
					    divWidthFirst=saX-eaX;
				    }
				    else
				    {
					    divWidthFirst=divX1+divWidthOrg-eaX;
				    }
				    divX1=eaX;
				    drawFirst=true;
			    }
			    else if(xDataArray1[divY]!=null && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
			    {
				    saX=xDataArray1[divY].xMax+1;
				    divWidthFirst=saX-divX1;
				    drawFirst=true;
			    }
			    else if(eaDvar>90 && saDvar<90)
			    {
				    drawFirst=true;
			    }
		    }
		    else //saDvar>eaDvar
		    {
			    if(xDataArray1[divY]!=null && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
			    {
				    saX=xDataArray1[divY].xMax+1;
				    divWidthFirst=saX-divX1;
				    drawFirst=true;
			    }
			    else if(eaDvar<90 && saDvar<90)
			    {
				    drawFirst=true;
			    }
    	
			    if(xDataArray2[divY]!=null && divX1+divWidthOrg>=xDataArray2[divY].xMin && divX1<=xDataArray2[divY].xMin)
			    {
				    divX2=xDataArray2[divY].xMin;
				    divWidthSecond=divWidthOrg-xDataArray2[divY].xMin+divX1;
				    drawSecond=true;
			    }
			    else if(eaDvar>90 && saDvar>90)
			    {
				    divX2=divX1;
				    divWidthSecond=divWidthOrg;
				    drawSecond=true;
			    }
		    }
    		
		    if(isUpperHalf)
		    {
			    if(drawFirst)
				    draw1=true;
    			
			    if(drawSecond)
				    draw3=true;
    				
			    divWidth1=divWidthFirst;
			    divWidth3=divWidthSecond;	
		    }
		    else
		    {
			    if(drawFirst)
				    draw2=true;
    			
			    if(drawSecond)
				    draw4=true;
    				
			    divWidth2=divWidthFirst;
			    divWidth4=divWidthSecond;	
		    }
    		
		    if(saD>=0 && saD<180 && eaD>=0 && eaD<180 && saD>eaD)
		    {
			    draw2=true;
		    }				
		    else if(saD>=180 && saD<360 && eaD>=180 && eaD<360 && saD>eaD)
		    {
			    draw1=true;
		    }
    		
		    if(divX2==null)
		    divX2="X";
		    if(divX1==null)
		    divX1="X";
    		
		    if(isUpperHalf)
		    {
			    divHeight=1;
			    if(draw3)
			    {
				    if(divX2!="X")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2 + "px;top:" + divY1 + "px;width:" + divWidth3 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
			    if(draw1)
			    {
				    if(divX1!="X")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1 + "px;top:" + divY1 + "px;width:" + divWidth1 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }	
		    else
		    {
			    divHeight=1;
			    if(draw4)
			    {
				    if(divX2!="X")
    				    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2 + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth4 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
			    if(draw2)
			    {
				    if(divX1!="X") 
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1 + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth2 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }			
	    }
    }

    //Draw arc with specified center, width, height, start angle and swap angle. 
    function drawArc(pen,center,width,height,startAngle,swapAngle)
    {
	    //Check arguments for null values
	    if(!pen || !center || !width || !height || startAngle==null || swapAngle==null)
		    return false;

	    width*=scale;
	    height*=scale;
       
        if(swapAngle==0)
        return;

        var arcDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();
        
        phCenter=logicalToPhysicalPoint(center);

	    var saD; //arc start angle degrees.
	    if(startAngle>360)
	        saD=startAngle%360;
	    else
	        saD=startAngle;
    	 
	    var swD; //swap angle in degrees.
	    if(swapAngle>360)
	        swD=swapAngle%360;
	    else
	        swD=swapAngle;
    	
	    var eaD; //arc end angle degrees.
	    eaD=parseFloat(saD)+parseFloat(swD);
	    if(eaD>360)
	        eaD=eaD%360; 
    	
	    //For cartecian coordinate system.
	    if(coordinateSystem=="cartecian")    
	    {
		    saD=360-saD;
		    eaD=360-eaD;
		    var tempAD;
		    tempAD=saD;
		    saD=eaD;
		    eaD=tempAD;
	    }
    	
	    var x1,y1,x2,y2;
	    var saR=saD*Math.PI/180;
	    var swR=swD*Math.PI/180;
	    var eaR=eaD*Math.PI/180;
    	
	    //For start angle
	    if((saD<=45 && saD>=0) || (saD>=135 && saD<=225) || (saD>=315 && saD<=360))
	    {
	        if(saD>=90 && saD<=270) 
	        {
	            y1=Math.round(phCenter.y-Math.tan(saR)*width/2);
		    x1=Math.round(phCenter.x-width/2);
		}
		else 
		{
		    y1=Math.round(phCenter.y+Math.tan(saR)*width/2);
		    x1=Math.round(phCenter.x+width/2);
		}
	    }
	    else
	    {
	        if(saD>=0 && saD<=180) 
	        {
	            x1=Math.round(phCenter.x+(1/Math.tan(saR))*height/2);
		    y1= Math.round(phCenter.y+height/2);
		}
		else 
		{
		    x1=Math.round(phCenter.x-(1/Math.tan(saR))*height/2);
		    y1=Math.round(phCenter.y-height/2);
		}
	    }
    	
	    //For end angle
	    if((eaD<=45 && eaD>=0) || (eaD>=135 && eaD<=225) || (eaD>=315 && eaD<=360))
	    {
	        if (eaD>= 90 && eaD<=270) 
	        {
	            y2=Math.round(phCenter.y-Math.tan(eaR)*width/2);
	            x2=Math.round(phCenter.x-width/2);
	        }
	        else 
	        {
	            y2=Math.round(phCenter.y+Math.tan(eaR)*width/2);
	            x2=Math.round(phCenter.x+width/2);
	        }
	    }
	    else {
	        if(eaD>=0 && eaD<=180) 
	        {
	            x2=Math.round(phCenter.x+(1/Math.tan(eaR))*height/2);
	            y2=Math.round(phCenter.y+height/2);
	        }
	        else 
	        {
	            x2=Math.round(phCenter.x-(1/Math.tan(eaR))*height/2);
	            y2=Math.round(phCenter.y-height/2);
	        }
	    }
	    
        //Get the pixel arrays for the lines croping the ellipse to form an arc.
	    xDataArraySa=getLinePixels(phCenter,new jsPoint(x1,y1));
	    xDataArrayEa=getLinePixels(phCenter,new jsPoint(x2,y2));
    	
	    var hexColor=pen.color.getHex();

	    var a=Math.round(width/2);
	    var b=Math.round(height/2);
	    var xc=phCenter.x;
	    var yc=phCenter.y;
    	
	    var x=0;
	    var y=b;
	    var a2=a*a;
	    var b2=b*b;
    	
	    var hexColor=pen.color.getHex();
    	
        //For Inner Ellipse
	    var ai=a-parseInt(pen.width)+1;
	    var bi=b-parseInt(pen.width)+1;
    	
	    var res=getInnerEllipse(phCenter,ai*2,bi*2)
	    var xArray=res[0];
	    var xArrayI=res[1];
	    xArray.pop();
	    xArrayI.pop();

	    var xp,yp;
	    var divX1,divX1pU,divX1pD,divX2,divX2pU,divX2pD,divY1,divY2,saX,eaX,saXp,eaXp,xpU,xpD,ypU,ypD,divX1i,divX2i,divX1pUi,divX1pDi,divX2pUi,divX2pDi;
	    var divWidthOrg,divWidth1,divWidth2,divWidth3,divWidth4,divWidth1p,divWidth2p,divWidth3p,divWidth4p,divHeight,divWidth1i,divWidth2i,divWidth3i,divWidth4i,divWidth1pi,divWidth2pi,divWidth3pi,divWidth4pi;
	    var draw1p,draw2p,draw3p,draw4p;
    	
	    xp=1;
	    yp=y;
    	
	    //Upper and lower portion of the ellipse constutuing the arc
 	    while(b2*x < a2*y)
  	    {     
  		    x++;    
 		    if((b2*x*x + a2*(y-0.5)*(y-0.5) - a2*b2) >=0)  
 			    y--;    
     			
      	    if(x==1 && y!=yp) //Topmost and bottom most points, to be tested
      	    {
      		    divY1=yc+yp-1;
			    divY2=yc-yp;
			    divWidthOrg=1;
			    divWidth1=divWidthOrg;
			    divWidth2=divWidthOrg;
			    divWidth3=divWidthOrg;
			    divWidth4=divWidthOrg;
			    divX1=xc;
    			
			    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
			    {
				    drawArcSegOut(true);
				    if(eaD<=saD)
				    drawArcSegOut(false);
			    }
			    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
			    {
				    drawArcSegOut(false);
				    if(eaD<=saD)
				    drawArcSegOut(true);
			    }
			    else
			    {
				    drawArcSegOut(true);
				    drawArcSegOut(false);
			    }
      	    }
		    else if(y!=yp)
		    {
			    divY1=yc+yp;
			    divY2=yc-yp;
			    divWidthOrg=2*(x-1)+1;
			    divWidth1=divWidthOrg;
			    divWidth2=divWidthOrg;
			    divWidth3=divWidthOrg;
			    divWidth4=divWidthOrg;
			    divX1=xc-x+1;
    			
			    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
			    {
				    drawArcSegOut(true);
				    if(eaD<=saD)
				    drawArcSegOut(false);
			    }
			    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
			    {
				    drawArcSegOut(false);
				    if(eaD<=saD)
				    drawArcSegOut(true);
			    }
			    else
			    {
				    drawArcSegOut(true);
				    drawArcSegOut(false);
			    }	
    			
			    yp=y;
			    xp=x;
		    }
    				
    		
		    //Last step in loop
		    if(b2*x >= a2*y)
		    {
			    divY1=yc+yp;
			    divY2=yc-yp;
			    divWidthOrg=2*x+1;
			    divWidth1=divWidthOrg;
			    divWidth2=divWidthOrg;
			    divWidth3=divWidthOrg;
			    divWidth4=divWidthOrg;
			    divX1=xc-x;
    			
			    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
			    {
				    drawArcSegOut(true);
				    if(eaD<=saD)
				    drawArcSegOut(false);
			    }
			    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
			    {
				    drawArcSegOut(false);
				    if(eaD<=saD)
				    drawArcSegOut(true);
			    }
			    else
			    {
				    drawArcSegOut(true);
				    drawArcSegOut(false);
			    }
		    }
	    }
    	  
        xp=x;
	    yp=y;
	    divHeight=1;

	    //Similar code as in next while loop for first y before the loop. Only values are retrieved and no drawing.
         			
	    divY1=yc+y;
	    divY2=yc-y;
	    divWidthOrg=2*x+1;
	    divWidth1=divWidthOrg;
	    divWidth2=divWidthOrg;
	    divWidth3=divWidthOrg;
	    divWidth4=divWidthOrg;
	    divX1=xc-x;
    	
	    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
	    {
		    xDataArrayEa.pop();				
		    drawArcSegIn(true,true);
		    if(eaD<=saD)
		    drawArcSegIn(false,true);
	    }				
	    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
	    {
		    xDataArrayEa.pop();				
		    if(y!=0)
			    drawArcSegIn(false,true);
		    if(eaD<=saD)
		        drawArcSegIn(true,true);
	    }
	    else
	    {
		    if(saD>=180 && saD<360)
			    xDataArraySa.pop();
		    else
			    xDataArrayEa.pop();
    		

		    drawArcSegIn(true,true);
		    if(y!=0)
		    {
			    divX1=xc-x;
			    drawArcSegIn(false,true);
		    }
	    }

	    //Left and Right portion of the ellipse ellipse constutuing the arc.
	    while(y!=0)  
	    {
		    y--;   
		    if((b2*(x+0.5)*(x+0.5) + a2*y*y - a2*b2)<=0)   
 			    x++;
     
		    divY1=yc+y;
		    divY2=yc-y;
		    divWidthOrg=2*x+1;
		    divWidth1=divWidthOrg;
		    divWidth2=divWidthOrg;
		    divWidth3=divWidthOrg;
		    divWidth4=divWidthOrg;
		    divX1=xc-x;
			
		    if(saD>=0 && saD<180 && eaD>=0 && eaD<180)
		    {
			    drawArcSegIn(true);
			    if(eaD<=saD)
			    drawArcSegIn(false);
		    }				
		    else if(saD>=180 && saD<360 && eaD>=180 && eaD<=360)
		    {
			    if(y!=0)
				    drawArcSegIn(false);
			    if(eaD<=saD)
				    drawArcSegIn(true);
		    }
		    else
		    {
			    drawArcSegIn(true);
			    if(y!=0)
			    {
				    divX1=xc-x;
				    drawArcSegIn(false);
			    }	
		    }
 	    }

 	    arcDiv.innerHTML=iHtml.join("");
 	    return arcDiv;

        //Internal function: Arc segment for left and right portion of the ellipse constutuing the arc.
	    function drawArcSegIn(isUpperHalf,valueOnly)
	    {
		    var divY;
		    var xDataArray1,xDataArray1;
		    var divWidthFirst=divWidthOrg;
		    var divWidthSecond=divWidthOrg;
		    var drawFirst=false;
		    var drawSecond=false;
		    var xIn;
    		
		    if(isUpperHalf)
		    {
			    var draw1=false; //upper half
			    var draw3=false; //upper half second
			    divY=divY1;
			    xDataArray1=xDataArraySa;
			    xDataArray2=xDataArrayEa;
			    saDvar=saD;
			    eaDvar=eaD;
		    }
		    else
		    {
			    var draw2=false; //lower half
			    var draw4=false; //lower half second
			    divY=divY2;
			    xDataArray2=xDataArraySa;
			    xDataArray1=xDataArrayEa;
			    saDvar=360-eaD;
			    eaDvar=360-saD;
		    }
		    if(eaDvar>saDvar)
		    {
			    if(xDataArray2[divY]!=null && divX1+divWidthOrg>=xDataArray2[divY].xMin && divX1<=xDataArray2[divY].xMin)
			    {
				    eaX=xDataArray2[divY].xMin;
				    if(xDataArray1[divY]!=null && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
				    {
					    saX=xDataArray1[divY].xMax+1;
					    divWidthFirst=saX-eaX;
				    }
				    else
				    {
					    divWidthFirst=divX1+divWidthOrg-eaX;
				    }
				    divX1=eaX;
				    drawFirst=true;
			    }
			    else if(xDataArray1[divY]!=null && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
			    {
				    saX=xDataArray1[divY].xMax+1;
				    divWidthFirst=saX-divX1;
				    drawFirst=true;
			    }
			    else if(eaDvar>90 && saDvar<90)
			    {
				    drawFirst=true;
			    }
		    }
		    else //saDvar>eaDvar
		    {
			    if(xDataArray1[divY]!=null && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
			    {
				    saX=xDataArray1[divY].xMax+1;
				    divWidthFirst=saX-divX1;
				    drawFirst=true;
			    }
			    else if(eaDvar<90 && saDvar<90)
			    {
				    drawFirst=true;
			    }
    	
			    if(xDataArray2[divY]!=null && divX1+divWidthOrg>=xDataArray2[divY].xMin && divX1<=xDataArray2[divY].xMin)
			    {
				    divX2=xDataArray2[divY].xMin;
				    divWidthSecond=divWidthOrg-xDataArray2[divY].xMin+divX1;
				    drawSecond=true;
			    }
			    else if(eaDvar>90 && saDvar>90)
			    {
				    divX2=divX1;
				    divWidthSecond=divWidthOrg;
				    drawSecond=true;
			    }
		    }
    		
		    if(isUpperHalf)
		    {
			    if(drawFirst)
				    draw1=true;
    			
			    if(drawSecond)
				    draw3=true;
    				
			    divWidth1=divWidthFirst;
			    divWidth3=divWidthSecond;	
		    }
		    else
		    {
			    if(drawFirst)
				    draw2=true;
    			
			    if(drawSecond)
				    draw4=true;
    				
			    divWidth2=divWidthFirst;
			    divWidth4=divWidthSecond;	
		    }
    		
		    if(saD>=0 && saD<180 && eaD>=0 && eaD<180 && saD>eaD)
		    {
			    draw2=true;
		    }				
		    else if(saD>=180 && saD<360 && eaD>=180 && eaD<360 && saD>eaD)
		    {
			    draw1=true;
		    }
     
            //Start: Only for drawArc (not in fillArc)        
            if(draw1)
            {
	            if(xArray[divY1-yc]!=null && divX1!=null)
	            {
	                if(xc+xArray[divY1-yc]<=divX1+divWidth1)
	                {
	                    if(divWidth1>divX1+divWidth1-xc-xArray[divY1-yc])
	                    {
	                        divX1i=xc+xArray[divY1-yc];
	                        divWidth1i=divX1+divWidth1-xc-xArray[divY1-yc];
	                    }
	                }
	                else
	                divX1i=null;
    	            
	                if(divX1<=xc-xArray[divY1-yc]+1)
	                {
	                    if(divWidth1>xc-xArray[divY1-yc]-divX1+1)
                            divWidth1=xc-xArray[divY1-yc]-divX1+1;
	                }
	                else if(divWidth1>=divX1+divWidth1-xc-xArray[divY1-yc]+1)
	                divX1=null;
		        }
		    }
            
            if(draw3)
            {
	            if(xArray[divY1-yc]!=null && divX2!=null)
	            {
                    if(xc+xArray[divY1-yc]<=divX2+divWidth3)
	                {
	                    if(divWidth3>divX2+divWidth3-xc-xArray[divY1-yc])
	                    {
	                        divX2i=xc+xArray[divY1-yc];
	                        divWidth3i=divX2+divWidth3-xc-xArray[divY1-yc];
	                    }
	                }
	                else
	                divX2i=null;
    	            
	                if(divX2<=xc-xArray[divY1-yc]+1)
	                {
	                    if(divWidth3>xc-xArray[divY1-yc]-divX2+1)
                            divWidth3=xc-xArray[divY1-yc]-divX2+1;
	                }
	                else if(divWidth3>=divX2+divWidth3-xc-xArray[divY1-yc]+1)
	                divX2=null;
	            }
	        }

            //Lower Half    
            if(draw2)
            {
	            if(xArray[divY1-yc]!=null && divX1!=null)
	            {
	                if(xc+xArray[divY1-yc]<=divX1+divWidth2)
	                {
	                    if(divWidth2>divX1+divWidth2-xc-xArray[divY1-yc])
	                    {
	                        divX1i=xc+xArray[divY1-yc];
	                        divWidth2i=divX1+divWidth2-xc-xArray[divY1-yc];
	                    }
	                }
	                else
	                divX1i=null;
    	            
	                if(divX1<=xc-xArray[divY1-yc]+1)
	                {
	                    if(divWidth2>xc-xArray[divY1-yc]-divX1+1)
                            divWidth2=xc-xArray[divY1-yc]-divX1+1;
	                }
	                else if(divWidth2>=divX1+divWidth2-xc-xArray[divY1-yc]+1)
	                divX1=null;
		        }
		    }
    		
            if(draw4)
            {
	            if(xArray[divY1-yc]!=null && divX2!=null)
	            {
                    if(xc+xArray[divY1-yc]<=divX2+divWidth4)
	                {
	                    if(divWidth4>divX2+divWidth4-xc-xArray[divY1-yc])
	                    {
	                        divX2i=xc+xArray[divY1-yc];
	                        divWidth4i=divX2+divWidth4-xc-xArray[divY1-yc];
	                    }
	                }
	                else
	                divX2i=null;
    	            
	                if(divX2<=xc-xArray[divY1-yc]+1)
	                {
	                    if(divWidth4>xc-xArray[divY1-yc]-divX2+1)
                            divWidth4=xc-xArray[divY1-yc]-divX2+1;
	                }
	                else if(divWidth4>=divX2+divWidth4-xc-xArray[divY1-yc]+1)
	                divX2=null;
	            }
	        }
            //End: Only for drawArc (not in fillArc)
            		
		    if(divX2==null)
		    divX2="";
		    if(divX1==null)
		    divX1="";
    		
    		
		    if(!valueOnly)
		    {
			    if(isUpperHalf)
			    {
				    if(x!=xpU || divX1pU!=divX1 || divX1pUi!=divX1i || divX2pU!=divX2 || divX2pUi!=divX2i || divWidth1!=divWidth1p || divWidth3!=divWidth3p || divWidth1i!=divWidth1pi || divWidth3i!=divWidth3pi)
				    {
					    divHeight=ypU-y;
					    if(draw3p)
					    {
						    if(divX2pU!=null && divX2pU!="")							
	    					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2pU + "px;top:" + (divY1+1) + "px;width:" + divWidth3p + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    	    					
    					    if(divX2pUi!=null && divX2pUi!="")
	    					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2pUi + "px;top:" + (divY1+1) + "px;width:" + divWidth3pi + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					    }

					    if(draw1p)
					    {
						    if(divX1pU!=null && divX1pU!="")
		    		            iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1pU + "px;top:" + (divY1+1) + "px;width:" + divWidth1p + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";

						    if(divX1pUi!=null && divX1pUi!="")
		    		            iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1pUi + "px;top:" + (divY1+1) + "px;width:" + divWidth1pi + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					    }
    					
					    if(draw1p||draw3p)	
					    {
						    divX1pU=divX1;
					        divX1pUi=divX1i;
    					    
						    draw1p=draw1;
						    draw3p=draw3;
    						
						    xpU=x;
						    ypU=y;
    					
						    divWidth1p=divWidth1;
						    divWidth3p=divWidth3;
    						
						    divX2pU=divX2;
						    divX2pUi=divX2i;
    						
						    divWidth1pi=divWidth1i;
						    divWidth3pi=divWidth3i;
					    }
				    }
			    }	
			    else
			    {
				    if(x!=xpD || divX1pD!=divX1 ||divX1pDi!=divX1i || divX2pD!=divX2 || divWidth2!=divWidth2p || divWidth2i!=divWidth2pi || divWidth4!=divWidth4p || divWidth4i!=divWidth4pi)
				    {
					    divHeight=ypD-y;
					    if(draw4p)
					    {
						    if(divX2pD!=null && divX2pD!="")
							    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2pD + "px;top:" + (divY2-divHeight) + "px;width:" + divWidth4p + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    						
						    if(divX2pDi!=null && divX2pDi!="")
							    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2pDi + "px;top:" + (divY2-divHeight) + "px;width:" + divWidth4pi + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					    }
					    if(draw2p)
					    {
						    if(divX1pD!=null && divX1pD!="") 
							    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1pD + "px;top:" + (divY2-divHeight) + "px;width:" + divWidth2p + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
    						
						    if(divX1pDi!=null && divX1pDi!="") 
							    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1pDi + "px;top:" + (divY2-divHeight) + "px;width:" + divWidth2pi + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					    }
					    if(draw2p||draw4p)
					    {
						    divX1pD=divX1;
					        divX1pDi=divX1i;
    					    
						    draw2p=draw2;
						    draw4p=draw4;

						    xpD=x;
						    ypD=y;
    					
						    divWidth2p=divWidth2;
						    divWidth4p=divWidth4;
    						
						    divX2pD=divX2;
						    divX2pDi=divX2i;
    						
						    divWidth2pi=divWidth2i;
						    divWidth4pi=divWidth4i;
					    }
				    }
			    }			
		    }
    		
		    //To get only values; used for first y value before loop.
		    if(valueOnly)
		    {
			    if(isUpperHalf)
			    {
				    draw1p=draw1;
				    draw3p=draw3;
    				
				    if(draw1p)
				    {
				        divX1pU=divX1;
				        divX1pUi=divX1i;
				    }
    				
				    if(draw3p)
				    {
					    divX2pU=divX2;
					    divX2pUi=divX2i;
				    }
    				
				    if(draw1p||draw3p)
				    {
				        ypU=y;
				        xpU=x;
				    }
				    else
				    {
				        ypU=0;
				        xpU=0;
				    }
    				
				    divWidth1p=divWidth1;
				    divWidth3p=divWidth3;
				    divWidth1pi=divWidth1i;
				    divWidth3pi=divWidth3i;

			    }
			    else
			    {
				    draw2p=draw2;
				    draw4p=draw4;

				    if(draw2p)
				    {
					    divX1pD=divX1;
					    divX1pDi=divX1i;
				    }
    				
				    if(draw4p)
				    {
					    divX2pD=divX2;
					    divX2pDi=divX2i;
				    }
    				
				    if(draw2p||draw4p)
				    {
				        ypD=y;
				        xpD=x;
				    }
				    else
				    {
				        ypD=0;
				        xpD=0;
				    }
    				
				    divWidth2p=divWidth2;
				    divWidth4p=divWidth4;
				    divWidth2pi=divWidth2i;
				    divWidth4pi=divWidth4i;
			    }
		    }
    		
		    if(!isUpperHalf)
		    {
			    draw2p=draw2;
			    draw4p=draw4;
		    }
		    else
		    {
			    draw1p=draw1;
			    draw3p=draw3;
		    }
    		
		    if(y==1 && !isUpperHalf)
		    {
			    divHeight=ypD-y+1;
			    if(draw4)
			    {
			        if(divX2!="")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2 + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth4 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					
			        if(divX2i!=null)
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2i + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth4i + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
			    if(draw2)
			    {
			        if(divX1!="")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1 + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth2 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					
				    if(divX1i!=null)
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1i + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth2i + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";						
			    }
		    }
		
		    if(y==0 && isUpperHalf)
		    {			
			    divHeight=ypU-y+1;
			    if(draw3)
			    {
			        if(divX2!="")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2 + "px;top:" + divY1 + "px;width:" + divWidth3 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					
			        if(divX2i!=null)
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2i + "px;top:" + divY1 + "px;width:" + divWidth3i + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }

			    if(draw1)
			    {
                    if(divX1!="")
    			        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1 + "px;top:" + divY1 + "px;width:" + divWidth1 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				    
                    if(divX1i!=null)
	    		        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1i + "px;top:" + divY1 + "px;width:" + divWidth1i + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }		
	    }
    	
	    //Internal function: Arc segment for upper and lower portion of the ellipse constutuing the arc.
	    function drawArcSegOut(isUpperHalf)
	    {
		    var divY;
		    var xDataArray1,xDataArray1;
		    var divWidthFirst=divWidthOrg;
		    var divWidthSecond=divWidthOrg;
		    var drawFirst=false;
		    var drawSecond=false;
    		
		    if(isUpperHalf)
		    {
			    var draw1=false; //upper half
			    var draw3=false; //upper half second
			    divY=divY1;
			    xDataArray1=xDataArraySa;
			    xDataArray2=xDataArrayEa;
			    saDvar=saD;
			    eaDvar=eaD;
		    }
		    else
		    {
			    var draw2=false; //lower half
			    var draw4=false; //lower half second
			    divY=divY2;
			    xDataArray2=xDataArraySa;
			    xDataArray1=xDataArrayEa;
			    saDvar=360-eaD;
			    eaDvar=360-saD;
		    }
		    if(eaDvar>saDvar)
		    {
			    if(xDataArray2[divY]!=null && divX1+divWidthOrg>=xDataArray2[divY].xMin && divX1<=xDataArray2[divY].xMin)
			    {
				    eaX=xDataArray2[divY].xMin;
				    if(xDataArray1[divY] && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
				    {
					    saX=xDataArray1[divY].xMax+1;
					    divWidthFirst=saX-eaX;
				    }
				    else
				    {
					    divWidthFirst=divX1+divWidthOrg-eaX;
				    }
				    divX1=eaX;
				    drawFirst=true;
			    }
			    else if(xDataArray1[divY]!=null && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
			    {
				    saX=xDataArray1[divY].xMax+1;
				    divWidthFirst=saX-divX1;
				    drawFirst=true;
			    }
			    else if(eaDvar>90 && saDvar<90)
			    {
				    drawFirst=true;
			    }
		    }
		    else //saDvar>eaDvar
		    {
			    if(xDataArray1[divY]!=null && divX1+divWidthOrg>=xDataArray1[divY].xMax+1 && divX1<=xDataArray1[divY].xMax+1)
			    {
				    saX=xDataArray1[divY].xMax+1;
				    divWidthFirst=saX-divX1;
				    drawFirst=true;
			    }
			    else if(eaDvar<90 && saDvar<90)
			    {
				    drawFirst=true;
			    }
    	
			    if(xDataArray2[divY]!=null && divX1+divWidthOrg>=xDataArray2[divY].xMin && divX1<=xDataArray2[divY].xMin)
			    {
				    divX2=xDataArray2[divY].xMin;
				    divWidthSecond=divWidthOrg-xDataArray2[divY].xMin+divX1;
				    drawSecond=true;
			    }
			    else if(eaDvar>90 && saDvar>90)
			    {
				    divX2=divX1;
				    divWidthSecond=divWidthOrg;
				    drawSecond=true;
			    }
		    }
    		
		    if(isUpperHalf)
		    {
			    if(drawFirst)
				    draw1=true;
    			
			    if(drawSecond)
				    draw3=true;
    				
			    divWidth1=divWidthFirst;
			    divWidth3=divWidthSecond;	
		    }
		    else
		    {
			    if(drawFirst)
				    draw2=true;
    			
			    if(drawSecond)
				    draw4=true;
    				
			    divWidth2=divWidthFirst;
			    divWidth4=divWidthSecond;	
		    }
    		
		    if(saD>=0 && saD<180 && eaD>=0 && eaD<180 && saD>eaD)
		    {
			    draw2=true;
		    }				
		    else if(saD>=180 && saD<360 && eaD>=180 && eaD<360 && saD>eaD)
		    {
			    draw1=true;
		    }
    		
            //Start: Only for drawArc (not in fillArc)    
            if(draw1)
            {
            
	            if(xArray[divY1-yc] && divX1!=null)
	            {
	                if(xc+xArray[divY1-yc]<=divX1+divWidth1)
	                {
	                    if(divWidth1>divX1+divWidth1-xc-xArray[divY1-yc])
	                    {
	                        divX1i=xc+xArray[divY1-yc];
	                        divWidth1i=divX1+divWidth1-xc-xArray[divY1-yc];
	                    }
	                }
	                else
	                divX1i="X";
    	            
	                if(divX1<xc-xArray[divY1-yc]+1)
	                {
	                    if(divWidth1>xc-xArray[divY1-yc]-divX1+1)
                            divWidth1=xc-xArray[divY1-yc]-divX1+1;
	                }
	                else if(divWidth1>=divX1+divWidth1-xc-xArray[divY1-yc]+1)
	                divX1="X";
		        }
    		    
		    }
            
            if(draw3)
            {
	            if(xArray[divY1-yc] && divX2!=null)
	            {
                    if(xc+xArray[divY1-yc]<=divX2+divWidth3)
	                {
	                    if(divWidth3>divX2+divWidth3-xc-xArray[divY1-yc])
	                    {
	                        divX2i=xc+xArray[divY1-yc];
	                        divWidth3i=divX2+divWidth3-xc-xArray[divY1-yc];
	                    }
	                }
	                else
	                divX2i="X";
    	            
	                if(divX2<=xc-xArray[divY1-yc]+1)
	                {
	                    if(divWidth3>xc-xArray[divY1-yc]-divX2+1)
                            divWidth3=xc-xArray[divY1-yc]-divX2+1;
	                }
	                else if(divWidth3>=divX2+divWidth3-xc-xArray[divY1-yc]+1)
	                divX2="X";
	            }
	        }

            //Lower Half    
            if(draw2)
            {
	            if(xArray[divY1-yc] && divX1!=null)
	            {
	                if(xc+xArray[divY1-yc]<=divX1+divWidth2)
	                {
	                    if(divWidth2>divX1+divWidth2-xc-xArrayI[divY1-yc])
	                    {
	                        divX1i=xc+xArray[divY1-yc];
	                        divWidth2i=divX1+divWidth2-xc-xArray[divY1-yc];
	                    }
	                }
	                else
	                divX1i="X";
    	            
	                if(divX1<=xc-xArray[divY1-yc]+1)
	                {
	                    if(divWidth2>xc-xArray[divY1-yc]-divX1+1)
                            divWidth2=xc-xArray[divY1-yc]-divX1+1;
	                }
	                else if(divWidth2>=divX1+divWidth2-xc-xArray[divY1-yc]+1)
	                divX1="X";
		        }
		    }
    		
            if(draw4)
            {
	            if(xArrayI[divY1-yc] && divX2!=null)
	            {
                    if(xc+xArray[divY1-yc]<=divX2+divWidth4)
	                {
	                    if(divWidth4>divX2+divWidth4-xc-xArray[divY1-yc])
	                    {
	                        divX2i=xc+xArray[divY1-yc];
	                        divWidth4i=divX2+divWidth4-xc-xArray[divY1-yc];
	                    }
	                }
	                else
	                divX2i="X";
    	            
	                if(divX2<=xc-xArray[divY1-yc]+1)
	                {
	                    if(divWidth4>xc-xArray[divY1-yc]-divX2+1)
                            divWidth4=xc-xArray[divY1-yc]-divX2+1;
	                }
	                else if(divWidth4>=divX2+divWidth4-xc-xArray[divY1-yc]+1)
	                divX2="X";
	            }
	        }
            //End: Only for drawArc (not in fillArc)    

		    if(divX2==null)
		    divX2="X";
		    if(divX1==null)
		    divX1="X";
    		
	        if(divX2i==null)
		    divX2i="X";
		    if(divX1i==null)
		    divX1i="X";
    		
		    if(isUpperHalf)
		    {
			    divHeight=1;
			    if(draw3)
			    {
				    if(divX2!="X")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2 + "px;top:" + divY1 + "px;width:" + divWidth3 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					
				    if(divX2i!="X")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2i + "px;top:" + divY1 + "px;width:" + divWidth3i + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }

			    if(draw1)
			    {
				    if(divX1!="X")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1 + "px;top:" + divY1 + "px;width:" + divWidth1 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";

				    if(divX1i!="X")
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1i + "px;top:" + divY1 + "px;width:" + divWidth1i + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }	
		    else
		    {
			    divHeight=1;
			    if(draw4)
			    {
				    if(divX2!="X")
				        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2 + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth4 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					
				    if(divX2i!="X")
				        iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX2i + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth4i + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
			    if(draw2)
			    {
				    if(divX1!="X") 
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1 + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth2 + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					
				    if(divX1i!="X") 
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + divX1i + "px;top:" + (divY2+1-divHeight) + "px;width:" + divWidth2i + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			    }
		    }			
	    }
    }

    //Draw polyline connecting to the specified points.
    function drawPolyline(pen,points)
    {
        //Check arguments for null values
	    if(!pen || !points)
		    return false;

	    var polylineDiv=canvasDiv.appendChild(document.createElement("div"));

	    for(var i=1;i<points.length;i++)
	    {
		    polylineDiv.appendChild(this.drawLine(pen,points[i-1],points[i]));
	    }
	    
	    return polylineDiv;
    }

    //Draw polygon connecting to the specified points.	
    function drawPolygon(pen,points)
    {
        //Check arguments for null values
	    if(!pen || !points)
		    return false;

	    var polylineDiv=canvasDiv.appendChild(document.createElement("div"));

	    var i;	
	    for(i=1;i<points.length;i++)
	    {
		    polylineDiv.appendChild(this.drawLine(pen,points[i-1],points[i]));
	    }
	    polylineDiv.appendChild(this.drawLine(pen,points[i-1],points[0]));
    }

    //Draw polygon filled with specified color and connecting to the specified points.	
	function fillPolygon(color,points)
	{
	    //Check arguments for null values
		if(!color || !points)
		return false;

		var phPoints=new Array();
		var i;
		
		for(i=0;i<points.length;i++)
		{
			phPoints[i]=logicalToPhysicalPoint(points[i]);
		}
		
	    var polygonDiv=canvasDiv.appendChild(document.createElement("div"));
		var iHtml=new Array();
		
		var hexColor=color.getHex(); 

		var xDataArrays=new Array();
		var yMin=phPoints[0].y;
		var yMax=phPoints[0].y;
		
		var newPoints=new Array();
		var l,m,n;
		var pointsCount;

		pointsCount=phPoints.length;
		
		//Remove duplicate consecutive points
		for(i=0;i<phPoints.length;i++)
		{
			if(i!=0)
			    m=i-1;
			else
			    m=pointsCount-1;
				    
			if(!(phPoints[m].x==phPoints[i].x && phPoints[m].y==phPoints[i].y))
			{
		        newPoints[newPoints.length]=phPoints[i];
			}
		}
		phPoints=newPoints;
		newPoints=new Array();
		
		pointsCount=phPoints.length;
		
		//For consecutive horizontal points
		for(i=0;i<phPoints.length;i++)
		{
			if(i!=0)
			    m=i-1;
			else
			    m=pointsCount-1;
			    
			if(i!=pointsCount-1)
			    n=i+1;
			else
			    n=0;
		  	
			if(!(phPoints[i].y==phPoints[n].y && phPoints[i].y==phPoints[m].y))
			{
		        newPoints[newPoints.length]=phPoints[i];
			}
			else
			{
			    //For consecutive horizontal points, just draw horizontal lines
				if(phPoints[m].x<=phPoints[i].x)
				{
					iHtml[iHtml.length]="<DIV style=\"position:absolute;height:1px;overflow:hidden;left:";
					iHtml[iHtml.length]=phPoints[m].x;
					iHtml[iHtml.length]="px;top:";
					iHtml[iHtml.length]=phPoints[i].y;
					iHtml[iHtml.length]="px;width:";
					iHtml[iHtml.length]=phPoints[i].x-phPoints[m].x;
					iHtml[iHtml.length]="px;background-color:";
					iHtml[iHtml.length]=hexColor;
					iHtml[iHtml.length]="\"></DIV>";
				}
				else
				{
					iHtml[iHtml.length]="<DIV style=\"position:absolute;height:1px;overflow:hidden;left:";
					iHtml[iHtml.length]=phPoints[i].x;
					iHtml[iHtml.length]="px;top:";
					iHtml[iHtml.length]=phPoints[i].y;
					iHtml[iHtml.length]="px;width:";
					iHtml[iHtml.length]=phPoints[m].x-phPoints[i].x;
					iHtml[iHtml.length]="px;background-color:";
					iHtml[iHtml.length]=hexColor;
					iHtml[iHtml.length]="\"></DIV>";
				}
			}
		}
		phPoints=newPoints;
		
		for(i=1;i<phPoints.length;i++)
		{
			if(yMin>phPoints[i-1].y)
			{
				yMin=phPoints[i-1].y;
			}
			if(yMax<phPoints[i-1].y)
			{
				yMax=phPoints[i-1].y;
			}
			
            //Get the pixel arrays for the lines connecting polygon vertices.
			xDataArrays[i-1]=getLinePixels(phPoints[i-1],phPoints[i]);
			
			//For verices, keep only one point and not two overlapping points
			if(i<phPoints.length-1)
			{
				if((phPoints[i-1].y<phPoints[i].y && phPoints[i].y<phPoints[i+1].y) || (phPoints[i-1].y>phPoints[i].y && phPoints[i].y>phPoints[i+1].y))
				{
					xDataArrays[i-1][phPoints[i].y]=null;	
				}
			}
			else
			{
				if((phPoints[i-1].y<phPoints[i].y && phPoints[i].y<phPoints[0].y) || (phPoints[i-1].y>phPoints[i].y && phPoints[i].y>phPoints[0].y))
				{
					xDataArrays[i-1][phPoints[i].y]=null;
				}
			}
		}
		
		if(yMin>phPoints[i-1].y)
		{
			yMin=phPoints[i-1].y;
		}
		if(yMax<phPoints[i-1].y)
		{
			yMax=phPoints[i-1].y;
		}
			
		xDataArrays[i-1]=getLinePixels(phPoints[i-1],phPoints[0]);
		if((phPoints[i-1].y<phPoints[0].y && phPoints[0].y<phPoints[1].y) || (phPoints[i-1].y>phPoints[0].y && phPoints[0].y>phPoints[1].y))
		{
			xDataArrays[i-1][phPoints[0].y]=null;
		}
					
		var y;
		var divStyle="";
		var j;
		pointsCount=phPoints.length;
		var xDataArray;
		var xMin,xMax;
		var curX,curY,curWidth;
		
		for(y=yMin;y<=yMax;y++)
		{
			j=0;
			var allXDataArray=new Array();
			
			for(i=0;i<pointsCount;i++)
			{
				xDataArray=xDataArrays[i];
				if(i!=0)
				    m=i-1;
				else
				    m=pointsCount-1;
				    
				if(i!=1 && i!=0)
				    l=i-2;
				else if(i==0)
				    l=pointsCount-2;    
				else
				    l=pointsCount-1;    
				    
				if(i!=pointsCount-1)
				    n=i+1;
				else
				    n=0;
				        
				if((y==phPoints[i].y && y==phPoints[m].y && y<phPoints[l].y && y<phPoints[n].y && xDataArray[y]) || (y==phPoints[i].y && y==phPoints[m].y && y>phPoints[l].y && y>phPoints[n].y && xDataArray[y]))
				{
					allXDataArray[j]= xDataArray[y];
					j++;
				}
				if(xDataArray[y])
				{
					allXDataArray[j]= xDataArray[y];
					j++;
				}
			}
            
            //Sorting based on xMin, uses sortXDataArray function
			allXDataArray.sort(sortXDataArray);
			
			curY=y;
			for(i=0;i<allXDataArray.length;i+=2)
			{
				if(allXDataArray[i+1])
				{
					curX=allXDataArray[i].xMin;
					if(allXDataArray[i+1].xMax>allXDataArray[i].xMax)
						curWidth=allXDataArray[i+1].xMax-allXDataArray[i].xMin+1;
					else
						curWidth=allXDataArray[i].xMax-allXDataArray[i].xMin+1;
				}
				else
				{
					curX=allXDataArray[allXDataArray.length-1].xMin;
					curWidth=allXDataArray[allXDataArray.length-1].xMax-allXDataArray[allXDataArray.length-1].xMin+1;
				}
				
				iHtml[iHtml.length]="<DIV style=\"position:absolute;height:1px;overflow:hidden;left:";
				iHtml[iHtml.length]=curX;
				iHtml[iHtml.length]="px;top:";
				iHtml[iHtml.length]=curY;
				iHtml[iHtml.length]="px;width:";
				iHtml[iHtml.length]=curWidth;
				iHtml[iHtml.length]="px;background-color:";
				iHtml[iHtml.length]=hexColor;
				iHtml[iHtml.length]="\"></DIV>";
			}
		}
		
	 	polygonDiv.innerHTML=iHtml.join("");
	 	return polygonDiv;

        //Internal function: sorting based on xMin
		function sortXDataArray(a,b)
		{
			return a.xMin - b.xMin;
		}
	}

    //Draw cubic bezier curve with specified 4 points
	function drawBezier(pen,points)
	{
		//Check arguments for null values
		if(!pen || !points)
			return false;
		
		var phPoints=new Array();
		var i;
		for(i=0;i<points.length;i++)
		{
			phPoints[i]=logicalToPhysicalPoint(points[i]);
		}

        //If no of points more than 4, take only first four points.
		if(phPoints.length>4)
		{
			phPoints=new Array(phPoints[0],phPoints[1],phPoints[2],phPoints[3]);
		}
		else if(phPoints.length<4)
		{
			return false;
		}
			
		var bezierDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();
        
		var xMin=phPoints[0].x;
		var xMax=phPoints[0].x;
		
		for(i=1;i<phPoints.length;i++)
		{
			if(xMin>phPoints[i-1].x)
			{
				xMin=phPoints[i-1].x;
			}
			if(xMax<phPoints[i-1].x)
			{
				xMax=phPoints[i-1].x;
			}
		}
		
		var p1x,p2x,p3x,p4x,p1y,p2y,p3y,p4y;
		p1x=phPoints[0].x;
		p1y=phPoints[0].y;

		p2x=phPoints[1].x;
		p2y=phPoints[1].y;

		p3x=phPoints[2].x;
		p3y=phPoints[2].y;

		p4x=phPoints[3].x;
		p4y=phPoints[3].y;

		var x,y,xB,t;
		
		var xl=p1x-1;
		var yl=p1y-1;
		var xp,yp;
		t=0;
		var f=1;
		var penWidth=parseInt(pen.width);
		var hexColor=pen.color.getHex();
		var divWidth=penWidth;
		var divHeight=penWidth;
		xp=p1x;
		yp=p1y;
		var yStart=false;
		var xStart=false;
		var k=1.1;
		//Array to hold all points on the bezier curve
		var curvePoints=new Array();
		
		var y1,y2,x1,x2;
		y1=yp;
		y2=yp;
		x1=xp;
		x2=xp;

		while(t<=1)
		{
			x=0;
			y=0;
			x=(1-t)*(1-t)*(1-t)*p1x + 3*(1-t)*(1-t)*t*p2x + 3*(1-t)*t*t*p3x + t*t*t*p4x;
			y=(1-t)*(1-t)*(1-t)*p1y + 3*(1-t)*(1-t)*t*p2y + 3*(1-t)*t*t*p3y + t*t*t*p4y;
			x=Math.round(x);
			y=Math.round(y);

			if(x!=xl || y!=yl)
			{
				if(x-xl>1 || y-yl>1 || xl-x>1 || yl-y>1)
				{
					t-=f;
					f=f/k;
				}
				else
				{
				    curvePoints[curvePoints.length]=new jsPoint(x,y);  
					xl=x;
					yl=y;
				}
			}
			else
			{
				t-=f;
				f=f*k;
			}
			t+=f;
		}
		
		var isEliminated=new Array();
		for(var i=0;i<curvePoints.length;i++)
		{
		    var next=false;
		    x=curvePoints[i].x;
		    y=curvePoints[i].y;
		    
		    //Eliminate extra points disturbing continuity/smoothness
		    if(i!=0 && i+1<curvePoints.length)
		    {
		    if(Math.abs(curvePoints[i-1].x-curvePoints[i+1].x)==1 && Math.abs(curvePoints[i-1].y-curvePoints[i+1].y)==1)
		        {
		            if(!isEliminated[i-1])
		            {
		                next=true;
		                isEliminated[i]=true;
		            }
		        }
		    }
		    
		    //Divs optimization
		    if(!next)
		    {
	    	    if(y==yp && !xStart)
				{
					yStart=true;
				}
				if(x==xp && !yStart)
				{
					xStart=true;
				}
				
				if(x!=xp && !yStart)
				{
					if(y2==y1)
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
						iHtml[iHtml.length]=xp;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=y1;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}	
					else
					{
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
					    iHtml[iHtml.length]=xp;
					    iHtml[iHtml.length]="px;top:";
					    iHtml[iHtml.length]=y1;
					    iHtml[iHtml.length]="px;width:";
					    iHtml[iHtml.length]=penWidth;
					    iHtml[iHtml.length]="px;height:";
					    iHtml[iHtml.length]=y2-y1+penWidth;
					    iHtml[iHtml.length]="px;background-color:";
					    iHtml[iHtml.length]=hexColor;
					    iHtml[iHtml.length]="\"></DIV>";
					}
					
					xp=x;
					yp=y;
					y1=yp;
					y2=yp;
					
					xStart=false;
				}
				
				if(y!=yp && !xStart )
				{
					if(x2==x1)
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
						iHtml[iHtml.length]=x1;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=yp;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}	
					else
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
						iHtml[iHtml.length]=x1;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=yp;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=x2-x1+penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}	

					xp=x;
					yp=y;
					x1=xp;
					x2=xp;
					
					yStart=false;
				}
				
				if(xStart && !yStart)
				{
					if(y<=y1)
					y1=y;
				
					if(y>y2)
					y2=y;
				}
				else
				{
					y1=y;
					y2=y;
				}
				
				if(yStart && !xStart)
				{
					if(x<=x1)
					x1=x;
				
					if(x>x2)
					x2=x;
				}
				else
				{
					x1=x;
					x2=x;
				}
				
				if(i==curvePoints.length-1) //last step in the loop
				{
					if(!xStart)
					{
						if(x2==x1)
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=x1;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=yp;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
						else
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=x1;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=yp;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=x2-x1+penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
					}
					if(!yStart)
					{
						if(y2==y1)
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=xp;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=y1;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
						else
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=xp;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=y1;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=x2-x1+penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=y2-y1+penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
					}
				}
			}		
		}
        
        bezierDiv.innerHTML=iHtml.join("");
        return bezierDiv;
	}

    //Draw general (poly) bezier curve with specified points
	function drawPolyBezier(pen,points)
	{
		//Check arguments for null values
		if(!pen || !points)
			return false;
		
		if(points.length<2)
		{
			return false;
		}
		
		var phPoints=new Array();
		for(var i=0;i<points.length;i++)
		{
			phPoints[i]=logicalToPhysicalPoint(points[i]);
		}
	
	    var bezierDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();		
			
		var cfx=new Array();
		var cfy=new Array();

		var n=phPoints.length-1;
		for(var i=0;i<=n;i++)
		{
			cfx[i]= phPoints[i].x*fact(n)/(fact(i)*fact(n-i));
			cfy[i]= phPoints[i].y*fact(n)/(fact(i)*fact(n-i));
		}
		
		var xl=phPoints[0].x-1;
		var yl=phPoints[0].y-1;
		var xp,yp;
		t=0;
		var f=1;
		var penWidth=parseInt(pen.width);
		var hexColor=pen.color.getHex();
		var divWidth=penWidth;
		var divHeight=penWidth;
		xp=phPoints[0].x;
		yp=phPoints[0].y;
		var yStart=false;
		var xStart=false;
		var divCount=0;
		var res;
		var fct=0;
		var x;
		var y;
		var j;
		var xd,yd;
		var k=1.1;
		//Array to hold all points on the bezier curve
		var curvePoints=new Array();
		
		var y1,y2,x1,x2;
		y1=yp;
		y2=yp;
		x1=xp;
		x2=xp;
        
		while(t<=1)
		{
			x=0;
			y=0;
            
			for(var i=0;i<=n;i++)
			{
				fct=Math.pow(1-t,n-i)*Math.pow(t,i);
				x= x + cfx[i]*fct;
				y= y + cfy[i]*fct;
			}
			var xd;
			var yd;
			xd=x;
			yd=y;
			x=Math.round(x);
			y=Math.round(y);
			
			if(x!=xl || y!=yl)
			{
			    if(x-xl >1 || y-yl>1 || xl-x>1 || yl-y>1)
				{
				    t-=f;
				    f=f/k;
				}
				else
				{
				    curvePoints[curvePoints.length]=new jsPoint(x,y);  
					xl=x;
					yl=y;
				}
			}
			else
			{
			    t-=f;
				f=f*k;
			}
			t+=f;
	    }
        		
		var isEliminated=new Array();
		for(var i=0;i<curvePoints.length;i++)
		{
		    var next=false;
		    x=curvePoints[i].x;
		    y=curvePoints[i].y;
		    
		    //Eliminate extra points disturbing continuity/smoothness
		    if(i!=0 && i+1<curvePoints.length)
		    {
		        if(Math.abs(curvePoints[i-1].x-curvePoints[i+1].x)==1 && Math.abs(curvePoints[i-1].y-curvePoints[i+1].y)==1)
		        {
		            if(!isEliminated[i-1])
		            {
		                next=true;
		                isEliminated[i]=true;
		            }
		        }
		    }
		    
		    //Divs optimization		    
		    if(!next)
		    {
	    	    if(y==yp && !xStart)
				{
					yStart=true;
				}
				if(x==xp && !yStart)
				{
					xStart=true;
				}
				
				if(x!=xp && !yStart)
				{
					if(y2==y1)
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
						iHtml[iHtml.length]=xp;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=y1;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}	
					else
					{
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
					    iHtml[iHtml.length]=xp;
					    iHtml[iHtml.length]="px;top:";
					    iHtml[iHtml.length]=y1;
					    iHtml[iHtml.length]="px;width:";
					    iHtml[iHtml.length]=penWidth;
					    iHtml[iHtml.length]="px;height:";
					    iHtml[iHtml.length]=y2-y1+penWidth;
					    iHtml[iHtml.length]="px;background-color:";
					    iHtml[iHtml.length]=hexColor;
					    iHtml[iHtml.length]="\"></DIV>";
					}    

					xp=x;
					yp=y;
					y1=yp;
					y2=yp;
					
					xStart=false;
				}
				
				if(y!=yp && !xStart )
				{
					if(x2==x1)
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
						iHtml[iHtml.length]=x1;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=yp;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}	
					else
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
						iHtml[iHtml.length]=x1;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=yp;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=x2-x1+penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}	

					xp=x;
					yp=y;
					x1=xp;
					x2=xp;
					
					yStart=false;
				}
				
				if(xStart && !yStart)
				{
					if(y<=y1)
					y1=y;
				
					if(y>y2)
					y2=y;
				}
				else
				{
					y1=y;
					y2=y;
				}
				
				if(yStart && !xStart)
				{
					if(x<=x1)
					x1=x;
				
					if(x>x2)
					x2=x;
				}
				else
				{
					x1=x;
					x2=x;
				}
				
				if(i==curvePoints.length-1) //last step in the loop
				{
					if(!xStart)
					{
						if(x2==x1)
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=x1;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=yp;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
						else
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=x1;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=yp;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=x2-x1+penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
					}
					if(!yStart)
					{
						if(y2==y1)
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=xp;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=y1;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
						else
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=xp;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=y1;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=x2-x1+penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=y2-y1+penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
					}
				}
			}		
		}

        bezierDiv.innerHTML=iHtml.join("");
        return bezierDiv;
        
        //Internal factorial function
		function fact(n)
		{
			var res = 1;
			for(var i=1;i<= n;i++)
        	{
        		res =res * i;
    		}
	    	return res;
		}
	}

    //Draw closed curve passing through the give points with specified tension
    //This method just calls drawCurve method with parameter isClosed=true
    function drawClosedCurve(pen,points,tension) 
	{
		return this.drawCurve(pen,points,tension,true); 
	}

    //Draw curve passing through the give points with specified tension
	function drawCurve(pen,points,tension,isClosed) 
	{
		if(!pen || !points)
			return false;
			
		if(!tension)
		{
			tension=0;
		}
		if(!isClosed)
		{
			isClosed=false;
		}

		var phPoints=new Array();
		for(var i=0;i<points.length;i++)
		{
			phPoints[i]=logicalToPhysicalPoint(points[i]);
		}
		
		var newPoints=new Array();

   		//Remove duplicate consecutive points (ToDo: neccessity of this step is to be confirmed)		
        if(!isClosed || !(phPoints[0].x==phPoints[phPoints.length-1].x && phPoints[0].y==phPoints[phPoints.length-1].y))
        {
            newPoints[newPoints.length]=phPoints[0];  
        }  

		for(var i=1;i<phPoints.length;i++)
		{
		    if(!(phPoints[i].x==phPoints[i-1].x && phPoints[i].y==phPoints[i-1].y))
		    {
		        newPoints[newPoints.length]=phPoints[i];  
		    }   
		}
        phPoints=newPoints;
        
        if(phPoints.length<2)
		{
			return false;
		}
		else if(phPoints.length==2)
		{
		    //For 2 points just draw a line connecting them.
			return this.drawLine(pen,phPoints[0],phPoints[1],"physical");
		}

	    var curveDiv=canvasDiv.appendChild(document.createElement("div"));
        var iHtml=new Array();
        //Array to hold points on the curve
		var curvePoints=new Array();
		
		var n=phPoints.length-1;
		//Call drawCurveSeg method in loop to get points in curvePoints 
		//array for segment (connecting 2 points) of the curve. 
		if(!isClosed) //for open curve
		{	
			for(var i=0;i<=n-1;i++)
			{
				if(i==0)
				{
					drawCurveSeg(new Array(phPoints[0],phPoints[0],phPoints[1],phPoints[2]),tension,curvePoints);
				}
				else if(i==n-1)
				{
					drawCurveSeg(new Array(phPoints[n-2],phPoints[n-1],phPoints[n],phPoints[n]),tension,curvePoints);
				}
				else
				{
					drawCurveSeg(new Array(phPoints[i-1],phPoints[i],phPoints[i+1],phPoints[i+2]),tension,curvePoints);
				}
			}
			//Actual drawing using points data in curvePoints array
			drawAllCurvePoints(pen,curvePoints,iHtml);
		}
		else //for closed curve
		{
			for(var i=0;i<=n-1;i++)
			{
				if(i==0)
				{
					drawCurveSeg(new Array(phPoints[n],phPoints[0],phPoints[1],phPoints[2]),tension,curvePoints);
				}
				else if(i==n-1)
				{
					drawCurveSeg(new Array(phPoints[n-2],phPoints[n-1],phPoints[n],phPoints[0]),tension,curvePoints);
				}
				else
				{
					drawCurveSeg(new Array(phPoints[i-1],phPoints[i],phPoints[i+1],phPoints[i+2]),tension,curvePoints);
				}
			}
			drawCurveSeg(new Array(phPoints[n-1],phPoints[n],phPoints[0],phPoints[1]),tension,curvePoints);
			//Actual drawing using points data in curvePoints array
			drawAllCurvePoints(pen,curvePoints,iHtml);
		}
		        
		curveDiv.innerHTML=iHtml.join("");
		return curveDiv;
	}

    //Private function used by drawCurve method to get curve points 
    //(in curvePoints array) for a single curve segment (connecting 2 points)
	function drawCurveSeg(segPoints,tension,curvePoints)
	{
		var x=0;
		var y=0;
		var xl=segPoints[1].x-1;
		var yl=segPoints[1].y-1;

		var	t=0;
		var f=1;
		var k=1.1;

		var m1x=(1-tension)*(segPoints[2].x-segPoints[0].x)/2;
		var m2x=(1-tension)*(segPoints[3].x-segPoints[1].x)/2;

		var m1y=(1-tension)*(segPoints[2].y-segPoints[0].y)/2;
		var m2y=(1-tension)*(segPoints[3].y-segPoints[1].y)/2;
		
		while(t<=1)
		{
			x=0;
			y=0;

			x= (2*t*t*t-3*t*t+1)*segPoints[1].x + (t*t*t-2*t*t+t)*m1x + (-2*t*t*t+3*t*t)*segPoints[2].x + (t*t*t-t*t)*m2x;
			y= (2*t*t*t-3*t*t+1)*segPoints[1].y + (t*t*t-2*t*t+t)*m1y + (-2*t*t*t+3*t*t)*segPoints[2].y + (t*t*t-t*t)*m2y;
				
			x=Math.round(x);
			y=Math.round(y);

			if(x!=xl || y!=yl)
			{
				if(x-xl>1 || y-yl>1 || xl-x>1 || yl-y>1)
				{
					t-=f;
					f=f/k;
				}
				else
				{
	                curvePoints[curvePoints.length]=new jsPoint(x,y); 
					xl=x;
					yl=y;
	                if(t+f>1)
	                    t=1-f;
				}
			}
			else
			{
				f=f*k;
			}
			t+=f;
		}
	}
		
	//Private function used by drawCurve method to draw actual curve
	//using and processing points data in curvePoints array
	function drawAllCurvePoints(pen,curvePoints,iHtml)
	{
	var xp=curvePoints[0].x;
	var yp=curvePoints[0].y;

	var yStart=false;
	var xStart=false;

	var x1,x2,y1,y2;
	x1=xp;
	x2=xp;
	y1=yp;
	y2=yp;

				
	var penWidth=parseInt(pen.width);
	var hexColor=pen.color.getHex();
	var divWidth=penWidth;
	var divHeight=penWidth;

	var isEliminated=new Array();
	for(var i=0;i<curvePoints.length;i++)
	{
	    var next=false;
	    x=curvePoints[i].x;
	    y=curvePoints[i].y;
	    
	    //Eliminate extra points disturbing continuity/smoothness
	    if(i!=0 && i+1<curvePoints.length)
	    {
		    if(Math.abs(curvePoints[i-1].x-curvePoints[i+1].x)==1 && Math.abs(curvePoints[i-1].y-curvePoints[i+1].y)==1)
	        {
	            if(!isEliminated[i-1])
	            {
	                next=true;
	                isEliminated[i]=true;
	            }
	        }
	    }

        //Divs optimization	    
	    if(!next)
	    {
	    	    if(y==yp && !xStart)
				{
					yStart=true;
				}
				if(x==xp && !yStart)
				{
					xStart=true;
				}
				
				if(x!=xp && !yStart)
				{
					if(y2==y1)
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:"
						iHtml[iHtml.length]=xp;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=y1;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}	
					else
					{
					    iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
					    iHtml[iHtml.length]=xp;
					    iHtml[iHtml.length]="px;top:";
					    iHtml[iHtml.length]=y1;
					    iHtml[iHtml.length]="px;width:";
					    iHtml[iHtml.length]=penWidth;
					    iHtml[iHtml.length]="px;height:";
					    iHtml[iHtml.length]=y2-y1+penWidth;
					    iHtml[iHtml.length]="px;background-color:";
					    iHtml[iHtml.length]=hexColor;
					    iHtml[iHtml.length]="\"></DIV>";
					}    

					xp=x;
					yp=y;
					y1=yp;
					y2=yp;
					
					xStart=false;
				}
				
				if(y!=yp && !xStart )
				{
					if(x2==x1)
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
						iHtml[iHtml.length]=x1;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=yp;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}	
					else
					{
						iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
						iHtml[iHtml.length]=x1;
						iHtml[iHtml.length]="px;top:";
						iHtml[iHtml.length]=yp;
						iHtml[iHtml.length]="px;width:";
						iHtml[iHtml.length]=x2-x1+penWidth;
						iHtml[iHtml.length]="px;height:";
						iHtml[iHtml.length]=penWidth;
						iHtml[iHtml.length]="px;background-color:";
						iHtml[iHtml.length]=hexColor;
						iHtml[iHtml.length]="\"></DIV>";
					}
					xp=x;
					yp=y;
					x1=xp;
					x2=xp;
					
					yStart=false;
				}
				
				if(xStart && !yStart)
				{
					if(y<=y1)
					y1=y;
				
					if(y>y2)
					y2=y;
				}
				else
				{
					y1=y;
					y2=y;
				}
				
				if(yStart && !xStart)
				{
					if(x<=x1)
					x1=x;
				
					if(x>x2)
					x2=x;
				}
				else
				{
					x1=x;
					x2=x;
				}
				
				if(i==curvePoints.length-1) //last step in the loop
				{
					if(!xStart)
					{
						if(x2==x1)
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=x1;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=yp;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;height:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
						else
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:"; 
							iHtml[iHtml.length]=x1; 
							iHtml[iHtml.length]="px;top:"; 
							iHtml[iHtml.length]=yp;
							iHtml[iHtml.length]="px;width:"; 
							iHtml[iHtml.length]=x2-x1+penWidth; 
							iHtml[iHtml.length]="px;height:"; 
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:"; 
							iHtml[iHtml.length]=hexColor; 
							iHtml[iHtml.length]="\"></DIV>";
						}	
					}
					if(!yStart)
					{
						if(y2==y1)
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=xp;
							iHtml[iHtml.length]="px;top:"; 
							iHtml[iHtml.length]=y1;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;height:"; 
							iHtml[iHtml.length]=penWidth;
							iHtml[iHtml.length]="px;background-color:"; 
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
						else
						{
							iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:";
							iHtml[iHtml.length]=xp;
							iHtml[iHtml.length]="px;top:";
							iHtml[iHtml.length]=y1;
							iHtml[iHtml.length]="px;width:";
							iHtml[iHtml.length]=x2-x1+penWidth;
							iHtml[iHtml.length]="px;height:"; 
							iHtml[iHtml.length]=y2-y1+penWidth; 
							iHtml[iHtml.length]="px;background-color:";
							iHtml[iHtml.length]=hexColor;
							iHtml[iHtml.length]="\"></DIV>";
						}	
					}
				}
			}	
		}		
	}
		
	//Draw color filled closed curve passing through the specified points 
	//with specified tension
	function fillClosedCurve(color,points,tension)
	{
		if(!color || !points)
			return false;
			
		if(!tension)
		{
			tension=0;
		}
		
		var phPoints=new Array();
		for(var i=0;i<points.length;i++)
		{
			phPoints[i]=logicalToPhysicalPoint(points[i]);
		}
		
		//Remove duplicate consecutive points (ToDo: neccessity of this step is to be confirmed)
		var newPoints=new Array();
	    if(!(phPoints[0].x==phPoints[phPoints.length-1].x && phPoints[0].y==phPoints[phPoints.length-1].y))
	    {
	        newPoints[newPoints.length]=phPoints[0];  
	    }   

		for(var i=1;i<phPoints.length;i++)
		{
		    if(!(phPoints[i].x==phPoints[i-1].x && phPoints[i].y==phPoints[i-1].y))
		    {
		        newPoints[newPoints.length]=phPoints[i];  
		    }   
		}
        phPoints=newPoints;
        
        if(phPoints.length<2)
		{
			return false;
		}
		else if(phPoints.length==2)
		{
		    //For 2 points just draw a line connecting them.
			return this.drawLine(pen,phPoints[0],phPoints[1],"physical");
		}
		        
	    var curveDiv=canvasDiv.appendChild(document.createElement("div"));
		var iHtml=new Array();
		
		var hexColor=color.getHex();
	
 		var xDataArray=new Array();
 		//Array to hold points on the curve
		var curvePoints=new Array();

		var yArray=new Array();
		var yMin;
		var yMax;
		var n=phPoints.length-1;
		var i;	

		//Call drawCurveSeg method in loop to get points in curvePoints 
		//array for segment (connecting 2 points) of the curve. 
		for(var i=0;i<=n-1;i++)
		{
			if(i==0)
			{
				getCurveSegPixels(new Array(phPoints[n],phPoints[0],phPoints[1],phPoints[2]),tension,curvePoints);
			}
			else if(i==n-1)
			{
				getCurveSegPixels(new Array(phPoints[n-2],phPoints[n-1],phPoints[n],phPoints[0]),tension,curvePoints);
			}
			else
			{
				getCurveSegPixels(new Array(phPoints[i-1],phPoints[i],phPoints[i+1],phPoints[i+2]),tension,curvePoints);
			}
		}

		getCurveSegPixels(new Array(phPoints[n-1],phPoints[n],phPoints[0],phPoints[1]),tension,curvePoints);
		
		//getAllCurvePointsArray function processes the points data from curvePoints
		//xDataArray is also populated by the fuction
		var allPointsResult=getAllCurvePointsArray(xDataArray,yArray,curvePoints);
		
		yMin=allPointsResult[0];
		yMax=allPointsResult[1];
		
		var y;
		var k;
		var divStyle="";
		var j;
		var pointsCount=phPoints.length;
		var curX,curY,curWidth;
		
		//Draw the actual filled curve by drawing div rectangles
		for(y=yMin;y<=yMax;y++)
		{
			j=0;
			var allXDataArray=xDataArray[y];
			//Sort allXDataArray based on xMin using sortXDataArray function
			allXDataArray.sort(sortXDataArray);
			
			curY=y;
			
			for(i=0;i<allXDataArray.length;i+=2)
			{
				if(allXDataArray[i+1])
				{
					curX=allXDataArray[i].xMin;
					if(allXDataArray[i+1].xMax>allXDataArray[i].xMax)
						curWidth=allXDataArray[i+1].xMax-allXDataArray[i].xMin+1;
					else
						curWidth=allXDataArray[i].xMax-allXDataArray[i].xMin+1;
				}
				else
				{
					curX=allXDataArray[allXDataArray.length-1].xMin;
					curWidth=allXDataArray[allXDataArray.length-1].xMax-allXDataArray[allXDataArray.length-1].xMin+1;
				}
				
				iHtml[iHtml.length]="<DIV style=\"position:absolute;height:1px;overflow:hidden;left:";
				iHtml[iHtml.length]=curX;
				iHtml[iHtml.length]="px;top:";
				iHtml[iHtml.length]=curY;
				iHtml[iHtml.length]="px;width:";
				iHtml[iHtml.length]=curWidth;
				iHtml[iHtml.length]="px;background-color:";
				iHtml[iHtml.length]=hexColor;
				iHtml[iHtml.length]="\"></DIV>";
			}
		}
		
		curveDiv.innerHTML=iHtml.join("");
		return curveDiv;

        //Internal sort function for allXDataArray array
		function sortXDataArray(a,b)
		{
			return a.xMin - b.xMin;
		}
	}

    //Private function used by fillClosedCurve method to get curve points 
    //(in curvePoints array) for a single curve segment (connecting 2 points)
	function getCurveSegPixels(segPoints,tension,curvePoints)
	{
		var x=0;
		var y=0;
		var xl=segPoints[1].x-1;
		var yl=segPoints[1].y-1;
		var	t=0;
		var f=1;
		var k=1.1;
		var penWidth=1;
		var divWidth=1;
		var divHeight=1;

		var m1x=(1-tension)*(segPoints[2].x-segPoints[0].x)/2;
		var m2x=(1-tension)*(segPoints[3].x-segPoints[1].x)/2;

		var m1y=(1-tension)*(segPoints[2].y-segPoints[0].y)/2;
		var m2y=(1-tension)*(segPoints[3].y-segPoints[1].y)/2;
		
		while(t<=1)
		{
			x=0;
			y=0;

			x= (2*t*t*t-3*t*t+1)*segPoints[1].x + (t*t*t-2*t*t+t)*m1x + (-2*t*t*t+3*t*t)*segPoints[2].x + (t*t*t-t*t)*m2x;
			y= (2*t*t*t-3*t*t+1)*segPoints[1].y + (t*t*t-2*t*t+t)*m1y + (-2*t*t*t+3*t*t)*segPoints[2].y + (t*t*t-t*t)*m2y;
				
			x=Math.round(x);
			y=Math.round(y);
		
			if(x!=xl || y!=yl)
			{
				if(x-xl>1 || y-yl>1 || xl-x>1 || yl-y>1)
				{
					t-=f;
					f=f/k;
				}
				else
				{
	                curvePoints[curvePoints.length]=new jsPoint(x,y);  
					xl=x;
					yl=y;
					if(t+f>1)
	                    t=1-f;
				}
			}
			else
			{
				f=f*k;
			}
			t+=f;
		}
    }
	
	//Private function that processes the points data from curvePoints
	//xDataArray is also populated by the fuction
	function getAllCurvePointsArray(xDataArray,yArray,curvePoints)
	{
		function xData()
		{
			this.xMax=0;
			this.xMin=0;
			this.i=0;
		}
		
		var isEliminated=new Array();
		var yMin;
		var yMax;
		var lastY;
		var firstY;
		var isFirst=true;
		var xDataArrayLast;
		var iLast=-1;
		var yTop1,yTop2;

		for(var i=0;i<curvePoints.length;i++)
		{
		    var next=false;
		    x=curvePoints[i].x;
		    y=curvePoints[i].y;

   		    //Eliminate extra points disturbing continuity/smoothness
		    if(i!=0 && i+1<curvePoints.length)
		    {
    		    if((curvePoints[i-1].x-curvePoints[i+1].x==1 || curvePoints[i+1].x-curvePoints[i-1].x==1) && (curvePoints[i-1].y-curvePoints[i+1].y==1 || curvePoints[i+1].y-curvePoints[i-1].y==1))
		        {
		            if(!isEliminated[i-1])
		            {
		                next=true;
		                isEliminated[i]=true;
		            }
		        }
		    }
		    
		    //Divs optimization
		    if(!next)
		    {
		    	if(!firstY)
		    		firstY=y;
		    		
		    	if(!yMin)
		    		yMin=y;
		    	if(!yMax)
		    		yMax=y;
	
		    	if(y<yMin)
		    		yMin=y;
		    	if(y>yMax)
		    		yMax=y;

				if(!xDataArray[y])
				{
					xDataArray[y]=new Array();
					xDataArray[y][0]=new xData();
					xDataArray[y][0].xMin=x;
					xDataArray[y][0].xMax=x;
					xDataArray[y][0].i=i;
				}
				else
				{
					xDataArrayLast=xDataArray[y][xDataArray[y].length-1];
					if(i-xDataArrayLast.i==1)
					{
						if(xDataArrayLast.xMin>x)
							xDataArrayLast.xMin=x;
						if(xDataArrayLast.xMax<x)
							xDataArrayLast.xMax=x;
							
						xDataArrayLast.i=i;
					}
					else
					{
						xDataArray[y][xDataArray[y].length]=new xData();
						xDataArray[y][xDataArray[y].length-1].xMin=x;
						xDataArray[y][xDataArray[y].length-1].xMax=x;
						xDataArray[y][xDataArray[y].length-1].i=i;
					}	
				}

				yTop1=yArray[yArray.length-1];
				yTop2=yArray[yArray.length-2];	
				
				if(yTop1 && yTop2) 
				{
					if((yTop1 > y && yTop2 < yTop1) || (yTop1 < y && yTop2 > yTop1))
					{
						xDataArray[yTop1][xDataArray[yTop1].length]=xDataArray[yTop1][xDataArray[yTop1].length-1];
					}
				}
				
				if(!yArray[0])
				{
					yArray[0]=y;
				}	
				else if(yArray[yArray.length-1]!=y)
				{
					yArray[yArray.length]=y;
				}
				
				lastY=y;
			}
		}
			
		yTop1=yArray[0];
		yTop2=yTop1;
		var i=1;
		while(yTop1==yTop2)
		{
		    yTop2=yArray[yArray.length-i];	
		    i++;
		}
			
		if(yTop1 && yTop2)
		{
			if((yTop1 > yArray[1] && yTop2 < yTop1) || (yTop1 < yArray[1] && yTop2 > yTop1))
			{
				xDataArray[yTop1][xDataArray[yTop1].length]=xDataArray[yTop1][xDataArray[yTop1].length-1];
			}
		}
		
		if(firstY==lastY)
		{
		    var firstXDataA=xDataArray[firstY][0];
		    var lastXDataA=xDataArray[lastY][xDataArray[lastY].length-1];
    		 	
		    if(lastXDataA.xMax>firstXDataA.xMax)
			    xDataArray[firstY][0].xMax=lastXDataA.xMax;
    			
		    if(lastXDataA.xMin<firstXDataA.xMin)
			    xDataArray[firstY][0].xMin=lastXDataA.xMin;
    			
		    if(xDataArray[lastY].length>1)
			    xDataArray[lastY].pop();
		    else
			    xDataArray.pop();
		}
		
		return new Array(yMin,yMax);	
	}
		
	//Draw text string at specified point with specified color,font,width & alignment	
    function drawText(text,point,font,color,width,align)
    {
		//Check arguments for null values        
    	if(!text || !point)
			return false;
			
		phPoint=logicalToPhysicalPoint(point);
		
		if(width!=null)
   		    width=Math.round(width*scale) + "px";
   		
        var textDiv=canvasDiv.appendChild(document.createElement("div"));

        textDiv.style.position="absolute";
        textDiv.style.left=phPoint.x + "px";
        textDiv.style.top=phPoint.y + "px";
        
        if(color)
	        textDiv.style.color=color.getHex();
                
        //set font
        if(font)
        {
        	if(font.family)
            	textDiv.style.fontFamily=font.family;

	        if(font.weight)
    	        textDiv.style.fontWeight=font.weight;
        
        	if(font.size)
            	textDiv.style.fontSize=font.size;
        
	        if(font.style)
    	        textDiv.style.fontStyle=font.style;
        
        	if(font.variant)
            	textDiv.style.fontVariant=font.variant;
		}
		
        if(width)
            textDiv.style.width=width;

        if(align) 
            textDiv.style.textAlign=align;

        textDiv.innerHTML=text;
        
        return textDiv;
    }
	
	//Draw image at specified point with specified width & height
    function drawImage(url,point,width,height)
    {
        if(!url || !point)
            return false;
             
        phPoint=logicalToPhysicalPoint(point);
      
        if(width!=null)
            width=Math.round(width*scale) + "px";
            
        if(height!=null)   
            height=Math.round(height*scale) + "px";

        var imgDiv=canvasDiv.appendChild(document.createElement("div"));

        imgDiv.style.position="absolute";
        imgDiv.style.left=phPoint.x + "px";
        imgDiv.style.top=phPoint.y + "px";
        //create and set img tag/element
        var img=imgDiv.appendChild(document.createElement("img"));
         
        img.src=url;
        
        if(width!=null)
        {
            img.style.width=width;
            imgDiv.style.width=width;
        }
          
        if(height!=null)
        {
            img.style.height=height;
            imgDiv.style.height=height;
        }
        
        return imgDiv;
    }
    
    //Clear the canvas div element
    function clear()
    {
    	canvasDiv.innerHTML="";
    }
}