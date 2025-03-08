// src/services/toastService.js
import { toastEventBus } from './_toastEventBus';

export const toastService = {
   add(toast) {
      toastEventBus.emit('add', toast);
   },

   success(detail, summary = 'Success', life = 3000) {
      this.add({ severity: 'success', summary, detail, life });
   },

   info(detail, summary = 'Info', life = 3000) {
      this.add({ severity: 'info', summary, detail, life });
   },

   warn(detail, summary = 'Warning', life = 3000) {
      this.add({ severity: 'warn', summary, detail, life });
   },

   error(detail, summary = 'Error', life = 3000) {
      this.add({ severity: 'error', summary, detail, life });
   },
};
