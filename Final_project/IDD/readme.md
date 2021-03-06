환자 식별기기
=============
# 하드웨어 구성
  ![식별기기 하드웨어 구성](/Final_project/Docs/Picture/IDD.png "식별기기 하드웨어 구성")
>  환자 식별기기를 구성하기 위해 그림과 같이 하드웨어를 구성하였다. Raspberry Pi Zero를 기반으로 1100mAh의 배터리를 장착하고, 배터리를 전원으로 사용하기 위해 (2)전원 관리 모듈을 사용한다. 또한 측정 시각을 정확하게 측정하기 위해 (1)RTC(Real Time Clock)을 탑재하고, 환자의 움직임을 감지하기 위해 (3)3축 가속도 센서를 부착한다. 연결은 아래 표와 같이 진행한다. 배터리의 경우 JST-2pin으로 전원 관리 센서에 연결한 후, microUSB를 이용하여 라즈베리파이 제로에 전원을 공급한다.

# 소프트웨어 구성
  ![식별기기 소프트웨어 구성](/Final_project/Docs/Picture/IDD_soft.PNG "식별기기 소프트웨어 구성")
> 1) 상태 유지 모듈
  ▪ 배터리를 이용하여 기기의 전원을 공급하고, 시각적으로 상태를 알 수 있도록 한다. 기기 배터리가 정상적으로 작동할 시 파란색 LED를 점등하고, 배터리가 부족할 시 빨간색 LED를 점등한다. 기기 전원 관리 모듈에 MicroUSB를 연결해 충전을 할 시 노란색 LED를 점등하고, 완전히 충전되었을 경우 초록색 LED를 점등한다.
  ▪ 기기가 켜져있는 동안 항시 서비스를 제공할 수 있도록 유지하고, 소프트웨어적인 오류가 발생할 시 오류 로그를 남긴 후 자동으롷 서비스를 재시작하여 서비스를 다시 제공할 수 있도록 한다. 지속적으로 서비스가 제공되지 못할 시 관리자를 통해 해결될 수 있도록 한다.

2) 데이터 송수신 모듈
  ▪ 기기에 내장된 Wi-Fi모듈을 이용하여 반응형 포스터 기기와 통신한다. 서로 REST API를 이용하여 데이터를 주고받으며, 수신받은 REST API를 분석하거나 REST API를 구성하여 전송한다.
3) 환자 식별 모듈
  ▪ 기기에 내장된 Wi-Fi모듈을 이용하여 일정 주기(8초 간격)로 주변의 반응형 포스터 기기의 AP(Access Point)를 검색하고, AP의 범위 내로 들었을 때에 해당 포스터 기기의 AP로 접속한다.
  ▪ 접속한 이후 적정 거리(2m 이내)로 접근하였을 시 환자 식별 과정을 진행하며, 환자 식별 기기는 환자 식별정보를 포스터 기기로 보내 기기가 가까이 접근했음을 알린다.
  ▪ 환자 식별정보를 정상적으로 전달하였다는 응답을 받은 후 환자의 운동량 정보를 전송한다. 이후 AP와의 연결을 지속적으로 유지하며 환자와 포스터 기기와의 거리를 계속 업데이트하여 반응형 포스터 기기가 이를 사용할 수 있도록 전송해준다.

4) 환자 운동량 측정 모듈
  ▪ 기기가 켜져있는 동안 기기에 내장된 가속도 센서를 이용하여 일정 주기(1초)로 가속도값을 측정하여 텍스트의 형태로 저장한다.
  ▪ 이후 반응형 포스터 기기에 연결하여 식별을 완료한 후에 전송하며, 이 데이터는 통합 관리 서버로 전송한다.

# 파일구성
 ![소프트웨어 파일 구조](/Final_project/Docs/Picture/IDD_tree.png "소프트웨어 파일 구조")
