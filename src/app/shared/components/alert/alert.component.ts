import { Component, Input } from "@angular/core";
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {

    @Input() timeout = 3000; //Inbound property initialized with 3 seconds
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) {

        this.alertService
            .getAlert()
            .subscribe(alert => {
                if(!alert) {
                    this.alerts = [];   //clean the alerts if the received alert is null
                    return;
                }

                this.alerts.push(alert);
                setTimeout(() => this.removeAlert(alert), this.timeout); //after timeout is elapsed then alert is removed
            });
    }

    removeAlert(alertToRemove: Alert) {
        this.alerts = this.alerts.filter(alert => alert != alertToRemove);  //removes the alert passed as a parameter
    }

    //This method returns a bootstrap class
    getAlertClass(alert:  Alert) {

        if(!alert) return '';

        switch (alert.alertType) {

            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.INFO:
                return 'alert alert-info';
            case AlertType.SUCCESS:
                return 'alert alert-success';
            case AlertType.WARNING:
                return 'alert alert-warning';

        }
    }
}