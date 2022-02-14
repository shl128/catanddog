//import ImageEditor from './react-image-editor';
import ImageEditor from '@toast-ui/react-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';

const CustomImageEditor = () => {
  return (
      <ImageEditor
        includeUI={{
          loadImage: {
            path: 'img/sampleImage.jpg',
            name: 'SampleImage',
          },
          menu: ['shape', 'filter', 'icon', 'text', 'crop', 'flip', 'mask'],
          initMenu: 'filter',
          uiSize: {
            width: '100%',
            height: '85%',
          },
          menuBarPosition: 'right',
        }}
        // cssMaxHeight={600}
        // cssMaxWidth={600}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
  )
}

export default CustomImageEditor;