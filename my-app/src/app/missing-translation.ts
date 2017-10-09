import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class NanoTaskMissingTranslationHandler implements MissingTranslationHandler {

    handle(params: MissingTranslationHandlerParams) {
        return 'Well that is embarrassing, sorry but we have not translated this element yet, we apologize for the inconvenience';
    }
}
