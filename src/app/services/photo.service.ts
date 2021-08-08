/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem} from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor(private platform: Platform) {}

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    if (!this.platform.is('hybrid')) {
      // Mandar Foto en Base 64
      for (let photo of this.photos) {
        // Leer y guar la foto
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        // Cargar foto solo base64
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  public async addNewToGallery() {
    // Obtener Foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const savedImageFile = await this.savePicture(capturedPhoto);

    // Agragar una Foto al Array
    this.photos.unshift(savedImageFile);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  // Guardar Foto
  private async savePicture(cameraPhoto: Photo) {
    // Convertir foto a Base 64 para guardar el fyle
    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }

  // Para que la camara se pueda ver en base64
  private async readAsBase64(cameraPhoto: Photo) {
    if (this.platform.is('hybrid')) {
      // para leer archivos en base64
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  //paraborrar la foto
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async deletePicture(photo: UserPhoto, position: number) {
    // para elimar 1 por 1 de la array
    this.photos.splice(position, 1);

    // actulizar la foto
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });

    // borrar foto del sistema 
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
