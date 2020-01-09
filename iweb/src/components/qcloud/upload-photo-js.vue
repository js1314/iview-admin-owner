<template>
  <Row type="flex">
    <img
      v-if="previewImgSrc"
      :src="previewImgSrc"
      style="width: 32px; height: 32px;margin:1px 10px 0 0;"
      alt=""/>
    <Upload
      action="image/upload"
      :before-upload="handleBeforeUpload"
      :disabled="uploadLoading"
      :show-upload-list="false"
      accept=".jpg,.jpeg,.gif,.png">
      <Button
        :type="buttonType"
        :icon="buttonIcon"
        :loading="uploadLoading"
        @click="handleUploadFile"/>
    </Upload>
  </Row>
</template>

<script>
  import COS from 'cos-js-sdk-v5';
  import {qcloud_get_tmp_key, qcloud_get_file_key} from "@/api/qcloud";

  export default {
    data() {
      return {
        previewImgSrc: '',
        uploadLoading: false,
        uploadFile: null
      };
    },
    computed: {
      buttonType() {
        return this.previewImgSrc ? 'success' : 'dashed';
      },
      buttonIcon() {
        return this.previewImgSrc ? 'md-cloud-done' : 'md-cloud-upload';
      }
    },
    methods: {
      handleBeforeUpload(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadstart = e => {
          this.uploadLoading = true;
        };
        reader.onload = (event) => {
          this.uploadLoading = false;
          this.previewImgSrc = event.srcElement.result;
          this.uploadFile = file;
          this.uploadToCloud();
        };
        return false;
      },
      handleUploadFile() {
        this.uploadLoading = false;
        this.uploadFile = null;
      },
      getCOS() {
        return new COS({
          getAuthorization: (options, callback) => {
            qcloud_get_tmp_key().then(res => {
              const {data} = res;
              if (data.code != 200) {
                this.$Message.error('获取KEY失败');
              } else {
                const {result} = data;
                const {credentials} = result;
                callback({
                  TmpSecretId: credentials.tmpSecretId,
                  TmpSecretKey: credentials.tmpSecretKey,
                  XCosSecurityToken: credentials.sessionToken,
                  ExpiredTime: result.expiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
                });
              }
            });
          }
        });
      },
      uploadToCloud() {
        if (!this.uploadFile) {
          this.$Message.error('没有图片要上传');
        } else {
          qcloud_get_file_key().then(res => {
            const {data} = res;
            if (data.code != 200) {
              this.$Message.error('获取图片名失败');
            } else {
              this.getCOS().putObject({
                ...this.$config.qcloud,
                Key: data.result + '.' + this.uploadFile.name.split('.').pop().toLocaleLowerCase(),
                Body: this.uploadFile,
              }, (error, data) => {
                if (error) {
                  this.$Message.error('图片上传云失败');
                } else {
                  this.$Message.success('图片上传云成功');
                  this.uploadLoading = false;
                  this.uploadFile = null;
                  // console.log(data);
                }
              });
            }
          });
        }
      }
    }
  };
</script>
