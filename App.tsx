import * as React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';

interface DemoProps { }

const Demo = (props: DemoProps) => {

  const [fileDetails, setFileDetails] = React.useState("")

  const selectFileFromDevice = async () => {
    // Pick a single file
    try {
      /*
        To open allow selecting of specific file types, replace 
        DocumentPicker.types.allFiles with desired constant from below:

        DocumentPicker.types.allFiles: All document types
        DocumentPicker.types.images: All image types
        DocumentPicker.types.plainText: Plain text files
        DocumentPicker.types.audio: All audio types
        DocumentPicker.types.pdf: PDF documents
        DocumentPicker.types.zip: Zip files
        DocumentPicker.types.csv: Csv files
        DocumentPicker.types.doc: doc files
        DocumentPicker.types.docx: docx files
        DocumentPicker.types.ppt: ppt files
        DocumentPicker.types.pptx: pptx files
        DocumentPicker.types.xls: xls files
        DocumentPicker.types.xlsx: xlsx files
      */
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      var fileDetails = "Path: " + res.uri + "\n\n";
      fileDetails += "Type: " + res.type + "\n\n";
      fileDetails += "Name: " + res.name + "\n\n";
      fileDetails += "Size: " + (roundValue(res.size / 1024)) + " KB \n\n";

      // Display the details of the file in UI
      setFileDetails(fileDetails);

      FileViewer.open(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  const roundValue = (value: number) => {
    return Math.round((value + Number.EPSILON) * 100) / 100
  }

  return (
    <View style={styles.container}>
      <Button title="Select File" onPress={selectFileFromDevice} />
      <Text style={styles.fileDetails}>{fileDetails}</Text>
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fileDetails: {
    margin: 8,
    fontWeight: "500"
  }
});
