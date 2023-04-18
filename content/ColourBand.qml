import QtQuick 2.15
import QtQuick.Layouts
import "ColourCalculators.js" as ColourCalculations
RowLayout {
    //The array of colour shades
    required property var colourShades
    width: ColourCalculations.SHADES.length * 100
    height: 200
    spacing: 0
    Repeater{
        model: ColourCalculations.SHADES
        ColumnLayout{
            spacing: 0
            Rectangle{
                color: colourShades[modelData]
                width: 100
                height: 100
            }
            Rectangle{
                color: "transparent"
                width: 100
                height: 50
                ColumnLayout{
                    spacing: 0
                    anchors.centerIn: parent
                    Text{
                        Layout.alignment: Qt.AlignHCenter
                        text: colourShades[modelData].toString()
                    }
                    Text{
                        Layout.alignment: Qt.AlignHCenter
                        text: modelData.substring(1)
                    }
                    Text{
                        Layout.alignment: Qt.AlignHCenter
                        text: (modelData.substring(1) === "500")? "Root" : ""
                        font.bold: true
                    }
                }
            }
        }
    }
}
