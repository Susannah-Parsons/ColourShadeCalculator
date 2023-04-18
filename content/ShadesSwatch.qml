import QtQuick 2.15
import QtQuick.Layouts
import "ColourCalculators.js" as ColourCalculations

Item{
    id: shadesRoot
    width: ColourCalculations.SHADES.length * 100
    height: childrenRect.height
    property var getColourRangeFunction
    property alias text: description.text
    property var targetSwatch
    property var mainColours

    ColumnLayout {
        width: ColourCalculations.SHADES.length * 100
        Rectangle{
            Layout.preferredWidth: (ColourCalculations.SHADES.length * 100)-20
            Layout.preferredHeight: childrenRect.height + 20
            Layout.margins: 10
            Text{
                anchors.margins: 10
                anchors.centerIn: parent
                id: description
                width: parent.width - 20
                wrapMode: Text.WordWrap
                font.pixelSize: 16
            }
        }

        Repeater{
            id: repeaterRoot
            Layout.alignment: Qt.AlignHCenter
            model: ColourCalculations.COLOURFUNCTIONS
            ColourBand{
                id: colourBand
                //Here, is the main colour function, used to get the main colour
                required property string modelData
                colourShades: shadesRoot.getColourRangeFunction(shadesRoot.mainColours[modelData], shadesRoot.targetSwatch)
            }
        }
    }
}
