<?php

class Mail {

	private $senderEmail = "contact.lucky.officiel@gmail.com";
	private $senderName ="SAMM";
	private $boundary;
	private $header;
	private $message;

	public $to;
	public $object;
	public $contentText;
	public $contentHtml;

	function __construct($contentText, $contentHtml) {
		$escape_line = "\n";
		$this->contentText = $contentText;
		$this->contentHtml = $contentHtml;
		$this->boundary = "-----=".md5(rand());
		
		$this->header = "From: \"$this->senderName\"<$this->senderEmail>".$escape_line;
		$this->header.= "Reply-to: \"$this->senderName\" <$this->senderEmail>".$escape_line;
		$this->header.= "MIME-Version: 1.0".$escape_line;
		$this->header.= "Content-Type: multipart/alternative;".$escape_line." boundary=\"$this->boundary\"".$escape_line;

		$message = $escape_line."--".$this->boundary.$escape_line;
		$message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".$escape_line;
		$message.= "Content-Transfer-Encoding: 8bit".$escape_line;
		$message.= $escape_line.$this->contentText.$escape_line;
		$message.= $escape_line."--".$this->boundary.$escape_line;
		$message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".$escape_line;
		$message.= "Content-Transfer-Encoding: 8bit".$escape_line;
		$message.= $escape_line.$this->contentHtml.$escape_line;
		$message.= $escape_line."--".$this->boundary."--".$escape_line;
		$message.= $escape_line."--".$this->boundary."--".$escape_line;

		$this->message = $message;
	}

	function send() {
		if (mail($this->to, $this->object, $this->message, $this->header)) {
			return true;
		}
		return false;
	}
}

?>