    function makeStruct(properties) {
      let props = properties;
      function constructor() {
        for (var i = 0; i < props.length; i++) {
          this[props[i]] = arguments[i];
        }
      }
      return constructor;
    }

    const SHADES = ['s900','s800','s700','s600','s500','s400','s300','s200','s100','s50'];

    const COLOURFUNCTIONS = ['primary','warning','danger','success','action'];

    let Swatch = makeStruct(SHADES);

    const black = Qt.color("#000000");
    const white = Qt.color("#FFFFFF");

    /*!
      \function blendColours(color1, color2, ratio)
      Returns the colour blend, for shades, blend with #000000. For Tints, blend with white #FFFFFF.
      color1 will be in the ratio given. color2 should be the black or white blend in ratio 1-ratio.
      */
    function blendColours(color1, color2, ratio){
        let r = (color1.r * (ratio)) + (color2.r * (1-ratio))
        let g = (color1.g * (ratio)) + (color2.g * (1-ratio))
        let b = (color1.b * (ratio)) + (color2.b * (1-ratio))

        return Qt.rgba(r,g,b,1)
    }

    /*!
      \function blendColoursToTargetRatios(color1, color2, ratioRed, ratioGreen, ratioBlue)
      Returns the colour blend, for shades, blend with #000000. For Tints, blend with white #FFFFFF.
      color1 will be in the ratio-per-channel given. color2 should be the black or white blend in ratio 1-ratio-per-channel.
      */
    function blendColoursToTargetRatios(color1, color2, ratioRed, ratioGreen, ratioBlue){
        let r = (color1.r * (ratioRed)) + (color2.r * (1-ratioRed))
        let g = (color1.g * (ratioGreen)) + (color2.g * (1-ratioGreen))
        let b = (color1.b * (ratioBlue)) + (color2.b * (1-ratioBlue))

        return Qt.rgba(r,g,b,1)
    }

    function changeLightness(mainColour, lightnessDifference){
        var newColour = Qt.color(mainColour.toString());
        let newLightness = newColour.hslLightness + lightnessDifference;
        if(newLightness > 1){
            newLightness = 1;
        }else if(newLightness < 0){
            newLightness = 0;
        }
        newColour.hslLightness = newLightness;
        return newColour;
    }

    function changeHSL(mainColour, hueDifference, saturationDifference, lightnessDifference){
        var newColour = Qt.color(mainColour.toString());
        let newLightness = newColour.hslLightness + lightnessDifference;
        if(newLightness > 1){
            newLightness = 1;
        }else if(newLightness < 0){
            newLightness = 0;
        }
        newColour.hslLightness = newLightness;

        let newSaturation = newColour.hslSaturation + saturationDifference;
        if(newSaturation > 1){
            newSaturation = 1;
        }else if(newSaturation < 0){
            newSaturation = 0;
        }
        newColour.hslSaturation = newSaturation;

        let newHue = newColour.hslHue + hueDifference;
        if(newHue > 1){
            newHue = 1;
        }else if(newHue < 0){
            newHue = 0;
        }
        newColour.hslHue = newHue;

        return newColour;
    }

    function getGreenTargetShadeRatio(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return targetShade.g/targetMainColour.g
    }

    function getGreenTargetTintRatio(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return (targetShade.g - white.g) / (targetMainColour.g - white.g)
    }

    function getRedTargetShadeRatio(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return targetShade.r/targetMainColour.r
    }

    function getRedTargetTintRatio(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return (targetShade.r - white.g) / (targetMainColour.r - white.g)
    }

    function getBlueTargetShadeRatio(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return targetShade.b/targetMainColour.b
    }

    function getBlueTargetTintRatio(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return (targetShade.b - white.g) / (targetMainColour.b - white.g)
    }

    function getLightnessDifference(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return targetShade.hslLightness - targetMainColour.hslLightness;
    }

    function getHueDifference(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return targetShade.hslHue - targetMainColour.hslHue;
    }

    function getSaturationDifference(shade, targetSwatch){
        let targetMainColour = targetSwatch.s500;
        let targetShade = targetSwatch[shade];
        return targetShade.hslSaturation - targetMainColour.hslSaturation;
    }

    function getGreenRatiosSwatch(targetSwatch){
        return new Swatch(getGreenTargetShadeRatio("s900", targetSwatch),getGreenTargetShadeRatio("s800", targetSwatch),getGreenTargetShadeRatio("s700", targetSwatch),
                          getGreenTargetShadeRatio("s600", targetSwatch),1.0,getGreenTargetTintRatio("s400", targetSwatch),getGreenTargetTintRatio("s300", targetSwatch),
                          getGreenTargetTintRatio("s200", targetSwatch),getGreenTargetTintRatio("s100", targetSwatch),getGreenTargetTintRatio("s50", targetSwatch));
    }

    function getRedRatiosSwatch(targetSwatch){
        return new Swatch(getRedTargetShadeRatio("s900", targetSwatch),getRedTargetShadeRatio("s800", targetSwatch),getRedTargetShadeRatio("s700", targetSwatch),
                          getRedTargetShadeRatio("s600", targetSwatch),1.0,getRedTargetTintRatio("s400", targetSwatch),getRedTargetTintRatio("s300", targetSwatch),
                          getRedTargetTintRatio("s200", targetSwatch),getRedTargetTintRatio("s100", targetSwatch),getRedTargetTintRatio("s50", targetSwatch));
    }

    function getBlueRatiosSwatch(targetSwatch){
        return new Swatch(getBlueTargetShadeRatio("s900", targetSwatch),getBlueTargetShadeRatio("s800", targetSwatch),getBlueTargetShadeRatio("s700", targetSwatch),
                          getBlueTargetShadeRatio("s600", targetSwatch),1.0,getBlueTargetTintRatio("s400", targetSwatch),getBlueTargetTintRatio("s300", targetSwatch),
                          getBlueTargetTintRatio("s200", targetSwatch),getBlueTargetTintRatio("s100", targetSwatch),getBlueTargetTintRatio("s50", targetSwatch));
    }

    function getLightnessDifferenceSwatch(targetSwatch){
        return new Swatch(getLightnessDifference("s900", targetSwatch),getLightnessDifference("s800", targetSwatch),getLightnessDifference("s700", targetSwatch),
                          getLightnessDifference("s600", targetSwatch),getLightnessDifference("s500", targetSwatch),getLightnessDifference("s400", targetSwatch),
                          getLightnessDifference("s300", targetSwatch),getLightnessDifference("s200", targetSwatch),getLightnessDifference("s100", targetSwatch),
                          getLightnessDifference("s50", targetSwatch));
    }

    function getHueDifferenceSwatch(targetSwatch){
        return new Swatch(getHueDifference("s900", targetSwatch),getHueDifference("s800", targetSwatch),getHueDifference("s700", targetSwatch),getHueDifference("s600", targetSwatch),
                          getHueDifference("s500", targetSwatch),getHueDifference("s400", targetSwatch),getHueDifference("s300", targetSwatch),getHueDifference("s200", targetSwatch),
                          getHueDifference("s100", targetSwatch),getHueDifference("s50", targetSwatch));
    }

    function getSaturationDifferenceSwatch(targetSwatch){
        return new Swatch(getSaturationDifference("s900", targetSwatch),getSaturationDifference("s800", targetSwatch),getSaturationDifference("s700", targetSwatch),
                          getSaturationDifference("s600", targetSwatch),getSaturationDifference("s500", targetSwatch),getSaturationDifference("s400", targetSwatch),
                          getSaturationDifference("s300", targetSwatch),getSaturationDifference("s200", targetSwatch),getSaturationDifference("s100", targetSwatch),
                          getSaturationDifference("s50", targetSwatch));
    }

    /*!
      \function getStdRgbRange(mainColour)
      Given the main colour, calculates the shades by mixing with black and tints by mixing with white.
      Shades and tints are as close to the target design swatch as possible based on the ratio to green on the green target swatch.
      */
    function getStdRgbRange(mainColour, targetSwatch) {
        //Getting the shades ratio swatch for the colour channel closest to half way between white and black
        var strongestColourSwatchRatio;
        const distRedFromAvg = Math.abs(128 - mainColour.r)
        const distGreenFromAvg = Math.abs(128 - mainColour.g)
        const distBlueFromAvg = Math.abs(128 - mainColour.b)
        if(distRedFromAvg < distGreenFromAvg && distRedFromAvg < distBlueFromAvg){
            strongestColourSwatchRatio = getRedRatiosSwatch(targetSwatch);
        }else if(distGreenFromAvg < distRedFromAvg && distGreenFromAvg < distBlueFromAvg){
            strongestColourSwatchRatio = getGreenRatiosSwatch(targetSwatch);
        }else{
            strongestColourSwatchRatio = getBlueRatiosSwatch(targetSwatch);
        }

        return new Swatch(blendColours(mainColour, black, strongestColourSwatchRatio["s900"]),
                          blendColours(mainColour, black, strongestColourSwatchRatio["s800"]),
                          blendColours(mainColour, black, strongestColourSwatchRatio["s700"]),
                          blendColours(mainColour, black, strongestColourSwatchRatio["s600"]),
                          mainColour,
                          blendColours(mainColour, white, strongestColourSwatchRatio["s400"]),
                          blendColours(mainColour, white, strongestColourSwatchRatio["s300"]),
                          blendColours(mainColour, white, strongestColourSwatchRatio["s200"]),
                          blendColours(mainColour, white, strongestColourSwatchRatio["s100"]),
                          blendColours(mainColour, white, strongestColourSwatchRatio["s50"])
                          )

    }
    /*!
      \function getStdHslRange(mainColour)
      Given the main colour, calculates the shades by changing the lightness value.
      Lightness is as close to the target design swatch as possible
      */
    function getStdHslRange(mainColour, targetSwatch){
        let lightnessDifferenceSwatch = getLightnessDifferenceSwatch(targetSwatch);
        return new Swatch(changeLightness(mainColour, lightnessDifferenceSwatch["s900"]),
                          changeLightness(mainColour, lightnessDifferenceSwatch["s800"]),
                          changeLightness(mainColour, lightnessDifferenceSwatch["s700"]),
                          changeLightness(mainColour, lightnessDifferenceSwatch["s600"]),
                          mainColour,
                          changeLightness(mainColour, lightnessDifferenceSwatch["s400"]),
                          changeLightness(mainColour, lightnessDifferenceSwatch["s300"]),
                          changeLightness(mainColour, lightnessDifferenceSwatch["s200"]),
                          changeLightness(mainColour, lightnessDifferenceSwatch["s100"]),
                          changeLightness(mainColour, lightnessDifferenceSwatch["s50"])
                          )
    }
    /*!
      \function getMatchedRgbRange(mainColour)
      Given the main colour, calculates the shades for each channel separately (red, green and blue)
      by mixing with black and tints for each channel separately by mixing with white.
      This means the colour accent will also change.
      Shades and tints are as close to the target design swatch as possible
      */
    function getMatchedRgbRange(mainColour, targetSwatch){
        let greenRatiosSwatch = getGreenRatiosSwatch(targetSwatch);
        let redRatiosSwatch = getRedRatiosSwatch(targetSwatch);
        let blueRatiosSwatch = getBlueRatiosSwatch(targetSwatch);
        return new Swatch(blendColoursToTargetRatios(mainColour, black, redRatiosSwatch["s900"], greenRatiosSwatch["s900"], blueRatiosSwatch["s900"]),
                          blendColoursToTargetRatios(mainColour, black, redRatiosSwatch["s800"], greenRatiosSwatch["s800"], blueRatiosSwatch["s800"]),
                          blendColoursToTargetRatios(mainColour, black, redRatiosSwatch["s700"], greenRatiosSwatch["s700"], blueRatiosSwatch["s700"]),
                          blendColoursToTargetRatios(mainColour, black, redRatiosSwatch["s600"], greenRatiosSwatch["s600"], blueRatiosSwatch["s600"]),
                          mainColour,
                          blendColoursToTargetRatios(mainColour, white, redRatiosSwatch["s400"], greenRatiosSwatch["s400"], blueRatiosSwatch["s400"]),
                          blendColoursToTargetRatios(mainColour, white, redRatiosSwatch["s300"], greenRatiosSwatch["s300"], blueRatiosSwatch["s300"]),
                          blendColoursToTargetRatios(mainColour, white, redRatiosSwatch["s200"], greenRatiosSwatch["s200"], blueRatiosSwatch["s200"]),
                          blendColoursToTargetRatios(mainColour, white, redRatiosSwatch["s100"], greenRatiosSwatch["s100"], blueRatiosSwatch["s100"]),
                          blendColoursToTargetRatios(mainColour, white, redRatiosSwatch["s50"], greenRatiosSwatch["s50"], blueRatiosSwatch["s50"])
                          )
    }
    /*!
      \function getMatchedHslRange(mainColour)
      Given the main colour, calculates the shades by changing the lightness value,
      but also attempts to include changes to hue and saturation, following the target swatch.
      Lightness is as close to the target design swatch as possible
      */
    function getMatchedHslRange(mainColour, targetSwatch){
        let lightnessDifferenceSwatch = getLightnessDifferenceSwatch(targetSwatch);
        let saturationDifferenceSwatch = getSaturationDifferenceSwatch(targetSwatch);
        let hueDifferenceSwatch = getHueDifferenceSwatch(targetSwatch);
        return new Swatch(changeHSL(mainColour, hueDifferenceSwatch["s900"], saturationDifferenceSwatch["s900"], lightnessDifferenceSwatch["s900"]),
                          changeHSL(mainColour, hueDifferenceSwatch["s800"], saturationDifferenceSwatch["s800"], lightnessDifferenceSwatch["s800"]),
                          changeHSL(mainColour, hueDifferenceSwatch["s700"], saturationDifferenceSwatch["s700"], lightnessDifferenceSwatch["s700"]),
                          changeHSL(mainColour, hueDifferenceSwatch["s600"], saturationDifferenceSwatch["s600"], lightnessDifferenceSwatch["s600"]),
                          mainColour,
                          changeHSL(mainColour, hueDifferenceSwatch["s400"], saturationDifferenceSwatch["s400"], lightnessDifferenceSwatch["s400"]),
                          changeHSL(mainColour, hueDifferenceSwatch["s300"], saturationDifferenceSwatch["s300"], lightnessDifferenceSwatch["s300"]),
                          changeHSL(mainColour, hueDifferenceSwatch["s200"], saturationDifferenceSwatch["s200"], lightnessDifferenceSwatch["s200"]),
                          changeHSL(mainColour, hueDifferenceSwatch["s100"], saturationDifferenceSwatch["s100"], lightnessDifferenceSwatch["s100"]),
                          changeHSL(mainColour, hueDifferenceSwatch["s50"], saturationDifferenceSwatch["s50"], lightnessDifferenceSwatch["s50"])
                          )
    }


