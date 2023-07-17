import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef, SimpleChange, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRecarga]'
})
export class RecargaDirective  implements OnChanges {

  @Input() appRecargar ! : number ;
  constructor(private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef)
     {
      this.viewContainerRef.createEmbeddedView( templateRef );
     }
     ngOnChanges(changes: SimpleChanges): void {
       if ( changes['appRecargar'])
       {
        this.viewContainerRef.clear()
        this.viewContainerRef.createEmbeddedView( this.templateRef)

       }
     }

}
