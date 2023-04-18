import QtQuick 2.15
import QtQuick.Layouts
import "ColourCalculators.js" as ColourCalculations
Rectangle {
    id: settingsRoot
    property var targetSwatch: new ColourCalculations.Swatch(
    Qt.color('#30770c'),Qt.color('#418814'),Qt.color('#4b9119'),Qt.color('#559b1e'),Qt.color('#5da322'),
    Qt.color('#75b143'),Qt.color('#8ebf64'),Qt.color('#aed191'),Qt.color('#cee3bd'),Qt.color('#ecf4e4')
    );

    property var mainColours: {
        "primary":Qt.color("#004893"), "warning":Qt.color(
        "#ffca00"), "danger":Qt.color("#dd171b"), "success":Qt.color("#5da322"), "action":Qt.color(
        "#0090df")
    };

    ColumnLayout{
        width: parent.width
        Text{
            Layout.alignment: Qt.AlignHCenter
            text: "Settings"
            font.pixelSize: 24
            font.bold: true
        }
        Text{
            Layout.alignment: Qt.AlignHCenter
            text: "Notice above that you can click to view the different results for four calculations: Standard RGB shades, Standard HSL shades, Matched RGB shades and Matched HSL shades"
            font.pixelSize: 16
        }
        Text{
            Layout.alignment: Qt.AlignHCenter
            text: "This tab is for adjusting settings. The settings are not currently saved and will revert to default when you reopen the app"
            font.pixelSize: 16
        }
        Text{
            Layout.alignment: Qt.AlignHCenter
            text: "All the calculations are currently based on the original design specification for the green shades"
            font.pixelSize: 16
        }
        ColourBand{
            id: colourBand
            Layout.alignment: Qt.AlignHCenter
            colourShades: settingsRoot.targetSwatch
        }
        Text{
            Layout.topMargin: 10
            Layout.alignment: Qt.AlignHCenter
            text: "Change target shades by typing in a new range of colour shades: "
            font.pixelSize: 16
        }
        RowLayout{
            Layout.alignment: Qt.AlignHCenter
            spacing: 20
            Repeater{
                model: ColourCalculations.SHADES
                ColumnLayout{
                    Text{
                        Layout.alignment: Qt.AlignHCenter
                        text: modelData.substring(1)
                    }
                    Rectangle{
                        id: inputRect
                        width: 80
                        height: 50
                        border.width: 1
                        border.color: "black"
                        TextInput{
                            id: targetSwatchInput
                            anchors.centerIn: parent
                            text: settingsRoot.targetSwatch[modelData]
                            onFocusChanged: if(focus)
                                {
                                    selectAll()
                                }else{
                                    settingsRoot.targetSwatch[modelData] = Qt.color(text)
                                    settingsRoot.targetSwatch = settingsRoot.targetSwatch
                                }
                        }
                    }
                }
            }
        }
        Text{
            Layout.topMargin: 30
            Layout.alignment: Qt.AlignHCenter
            text: "Colour swatches are calculated and shown for the current root colours from the original design"
            font.pixelSize: 16
        }
        RowLayout{
            Layout.alignment: Qt.AlignHCenter
            Repeater{
                model: ColourCalculations.COLOURFUNCTIONS
                ColumnLayout{
                    Rectangle{
                        width: 100
                        height: 100
                        color: settingsRoot.mainColours[modelData]
                    }
                    Rectangle{
                        width: 100
                        height: 100
                        color: "transparent"
                        ColumnLayout{
                            anchors.horizontalCenter: parent.horizontalCenter
                            Text{
                                text: modelData
                            }
                            Text{
                                text: settingsRoot.mainColours[modelData].toString()
                            }
                        }
                    }
                }
            }
        }
        Text{
            Layout.topMargin: 10
            Layout.alignment: Qt.AlignHCenter
            text: "Change root colours by typing in a new range of colours: "
            font.pixelSize: 16
        }
        RowLayout{
            Layout.alignment: Qt.AlignHCenter
            spacing: 20
            Repeater{
                model: ColourCalculations.COLOURFUNCTIONS
                ColumnLayout{
                    Text{
                        Layout.alignment: Qt.AlignHCenter
                        text: modelData
                    }
                    Rectangle{
                        id: colourInputRect
                        width: 80
                        height: 50
                        border.width: 1
                        border.color: "black"
                        TextInput{
                            anchors.centerIn: parent
                            text: settingsRoot.mainColours[modelData]
                            onFocusChanged: if(focus)
                                {
                                    selectAll()
                                }else{
                                    settingsRoot.mainColours[modelData] = Qt.color(text)
                                    settingsRoot.mainColours = settingsRoot.mainColours
                                }
                        }
                    }
                }
            }
        }
    }
}
