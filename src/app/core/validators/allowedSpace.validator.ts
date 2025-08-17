import { AbstractControl, ValidationErrors } from "@angular/forms";
export class customValidator{
    static noSpaceAlowed(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && control.value.includes(' ')) {
            return { noSpaceAlowed: true }; // Key should match the validator name
        }
        return null;
    };
}