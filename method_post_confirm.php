<?php
public function post_confirm(){
	$id = Input::get('service_id');
	$servicio = Service::find($id);
	$return_function = '';

	if(!isset($servicio)) {
		if($servicio->status_id == Config::get('service_fail')) {
			$return_function = Response::json(array('error' => Config::get('error_service_fail')));
		}
		if(!isset($servicio->driver_id) && $servicio->status_id == Config::get('status_no_driver')) {
			$data_update = array(
				'driver_id' => Input::get('driver_id'),
				'status_id' => Config::get('status_no_driver'));
			$servicio = Service::update($id, $data_update);
			Driver::update(Input::get('driver_id'), array('available' => Config::get('status_no_available')));
			$driverTmp = Driver::find(Input::get('driver_id'));
			Service::update($id, array('car_id' => $driverTmp->car_id));
			$pushMessage = Lang::get('Tu servicio ha sido confirmado!');
			$servicio = Service::find($id);
			$push = Push::make();
			if(empty($servicio->user->uuid)) {
				$return_function = Response::json(array('error' => Config::get('error_no_user')));
			}
			if ($servicio->user->type == Config::get('iphone_type')) {
				$result = $push->ios($servicio->user->uuid, $pushMessage, 1, 'honk.wav', 'Open', array('serviceId' => $servicio->id));
			} else {
				$result = $push->android2($servicio->user->uuid, $pushMessage, 1, 'default', 'Open', array('serviceId' => $servicio->id));
			}
			$return_function = Response::json(array('error' => Config::get('error_no_user')));
		} else {
			$return_function = Response::json(array('error' => Config::get('error_service_status')));		
		}
	} else {
		$return_function = Response::json(array('error' => Config::get('error_service')));
	}

	return $return_function;
}
