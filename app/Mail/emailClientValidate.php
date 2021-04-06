<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class emailClientValidate extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */    
    public $_urlValidationMail; 

    public function __construct($urlValidationMail){        
        $this->_urlValidationMail = $urlValidationMail;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(){      
        $url =  $this->_urlValidationMail;
        return $this->view('email.validateClent',compact('url'));
    }
}
