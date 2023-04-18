import QtQuick 6.2
import QtQuick.Controls 6.2
import QtQuick.Layouts
import ColourShadeCalculators
import "ColourCalculators.js" as ColourCalculations

Rectangle {
    id: colourShadeCalcRoot
    color: "#FFFFFF"

    ColumnLayout {
        width: colourShadeCalcRoot.width
        height: colourShadeCalcRoot.height
        TabBar {
            id: tabBar
            Layout.preferredWidth: colourShadeCalcRoot.width
            TabButton {
                id: settingsTab
                text: qsTr("Settings")
            }
            TabButton {
                id: standardRGBTab
                text: qsTr("Standard RGB Shades")
            }
            TabButton {
                id: standardHSLTab
                text: qsTr("Standard HSL Shades")
            }
            TabButton {
                id: matchedRGBTab
                text: qsTr("Matched RGB Shades")
            }
            TabButton {
                id: matchedHSLTab
                text: qsTr("Matched HSL Shades")
            }
        }

        StackLayout {
            Layout.fillHeight: true
            Layout.fillWidth: true
            currentIndex: tabBar.currentIndex
            Settings {
                id: settings
                Layout.fillHeight: true
                Layout.fillWidth: true
            }
            Rectangle {
                Layout.fillHeight: true
                Layout.fillWidth: true
                ShadesSwatch {
                    id: stdRGBSwatch
                    mainColours: settings.mainColours
                    targetSwatch: settings.targetSwatch
                    anchors.horizontalCenter: parent.horizontalCenter
                    getColourRangeFunction: ColourCalculations.getStdRgbRange
                    text: "The standard RGB calculator works by mixing the root colour with black (for shades) and white (for tints)." + "It's a bit like giving the root colour some transparency and laying it over a black or white background." + "The ratio of root colour to white/black was calculated based on the current design swatch for the main colour channel closest to midway between white and black. It uses " + "the ratio of the chosen channel to black/white for each shade/tint and applies it to the new colour across " + "all the colour channels (red, green and blue). This keeps the colour the same as the root colour (no accents) "
                          + " but gives it different shades/tints."
                }
            }
            Rectangle {
                Layout.fillHeight: true
                Layout.fillWidth: true
                ShadesSwatch {
                    id: stdHSLSwatch
                    mainColours: settings.mainColours
                    targetSwatch: settings.targetSwatch
                    anchors.horizontalCenter: parent.horizontalCenter
                    getColourRangeFunction: ColourCalculations.getStdHslRange
                    text: "The standard HSL calculator works by changing the lightness component of the colour, but " + "leaving the hue and saturation unaltered (so as to preserve the original colour, so no accents)." + " This has, again, been calculated from the green design swatch - changing the lightness to match " + "the lightness for the different shades of green on the original design swatch and applying it to the"
                          + " root colour, but not altering the hue and saturation."
                }
            }
            Rectangle {
                Layout.fillHeight: true
                Layout.fillWidth: true
                ShadesSwatch {
                    id: matchedRGBSwatch
                    mainColours: settings.mainColours
                    targetSwatch: settings.targetSwatch
                    anchors.horizontalCenter: parent.horizontalCenter
                    getColourRangeFunction: ColourCalculations.getMatchedRgbRange
                    text: "The matched RGB calculator works by mixing each channel of the root colour with black (for shades) and white (for tints)." + "Unlike the standard calculation, this one matches the mix of black/white to each of the channels (red, green and blue) " + "so the colour is slightly changed (accents) as well as the shade. Since it follows the original green design changes, the"
                          + " resulting green colour swatch should match the original"
                }
            }
            Rectangle {
                Layout.fillHeight: true
                Layout.fillWidth: true
                ShadesSwatch {
                    id: matchedHSLSwatch
                    mainColours: settings.mainColours
                    targetSwatch: settings.targetSwatch
                    anchors.horizontalCenter: parent.horizontalCenter
                    getColourRangeFunction: ColourCalculations.getMatchedHslRange
                    text: "The matched HSL calculator works by changing the lightness component of the colour, and also " + "matching the hue and saturation changes compared with the original green swatch." + " This means the accents (colour) changes slightly across the shades in line with the changes on the "
                          + "original green design swatch - so the green should match the original."
                }
            }
        }
    }
}
