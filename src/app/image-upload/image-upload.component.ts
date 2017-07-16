import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @ViewChild("myInput") myInputVariable: any;
  constructor() { }
  @Input() acceptImage: String;
  @Input() maxImageSize: number;
  @Input() errorText: String;
  @Output() changeImage = new EventEmitter<boolean>();
  @Output() resetImage = new EventEmitter<boolean>();

  ngOnInit() {
  }
  cacheData: any = {
    encodedImageType: null,
    encodedImage: null,
    fileObj: {},
    // imageAccept: 'image/jpg,image/png,image/jpeg'
  }

  reset() {
    this.myInputVariable.nativeElement.value = "";
    this.cacheData = {
      ...this.cacheData,
      encodedImageType: null,
      encodedImage: null,
      fileObj: {}
    };
    this.showFileTooLargeMessage = false;
    this.resetImage.emit()
  }

  imageFileObject: any = {};
  uploadedFilename: any = "";
  private base64textString: String = "";
  onChangeFile(event) {
    this.imageFileObject = event.target.files;
    this.uploadedFilename = event.target.files[0].name;
    this.handleFileSelect(event);
  }
  showFileTooLargeMessage = false;
  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    var fileSize = file.size / 1024;

    if (files && file && fileSize <= this.maxImageSize) {
      this.showFileTooLargeMessage = false;
      var reader = new FileReader();
      this.cacheData = {
        ...this.cacheData,
        fileObj: file,
      };
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    } else {
      this.reset();
      this.showFileTooLargeMessage = true;
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.cacheData = {
      ...this.cacheData,
      encodedImage: btoa(binaryString),
      encodedImageType: this.cacheData["fileObj"].type.split("/")[1],
    };
    console.log(this.cacheData)
    this.changeImage.emit(this.cacheData)
  }

}
