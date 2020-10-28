import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/user/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mail-tester',
  templateUrl: './mail-tester.component.html',
  styleUrls: ['./mail-tester.component.scss'],
  providers: [MessageService]
})
export class MailTesterComponent implements OnInit {
  mailTemplates = [{
    code: 'TRACKER_MAIL',
    name: 'Tracker Mail',
  }, {
    code: 'ACTIVATION_MAIL',
    name: 'Activation Mail',
  }, {
    code: 'RESET_PASSWORD_MAIL',
    name: 'Reset Password Mail',
  }, {
    code: 'INVITATION_MAIL',
    name: 'Invitation Mail',
  }, {
    code: 'WELCOME_MAIL',
    name: 'Welcome Mail',
  }, {
    code: 'DAILY_STATUS_MAIL',
    name: 'Daily Status Mail',
  }];
  mailTemplate: string;
  selectedTemplateCtrl = new FormControl('', {});

  mailTesterForm: FormGroup = this.formBuilder.group({
    selectedTemplate: this.selectedTemplateCtrl
  });
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private msgService: MessageService) { }

  ngOnInit(): void {
  }

  sendMail() {
    this.userService.testMailTemplate(this.selectedTemplateCtrl.value).subscribe(
      (response: any) => {
        this.msgService.clear();
        this.msgService.add({
          severity: 'success',
          detail: response.message
        });
        console.log(response);
      },
      error => {

      }
    );
  }

}
