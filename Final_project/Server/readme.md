통합관리서버
============

 소프트웨어
 ---------
1. 데이터 송수신 모듈
  + 이더넷을 통해 데이터를 수신하며, 인터넷에 연결되어 어디서든 접속할 수 있도록 한다. 웹 페이지의 요청이나 반응형 포스터 기기의 요청을 처리한다.
  + 웹페이지 요청에 따른 REST 메세지를 수신하고, 이를 분석하여 처리한다. 또한 데이터 요청의 경우 적절한 REST메세지를 구성하여 응답한다.
  
2. 기기 정보 관리 모듈
  + 반응형 포스터 기기, 환자 식별기기에 대한 정보를 총괄적으로 관리한다. 등록, 삭제, 수정, 검색을 수행할 수 있으며 관리자는 웹 페이지를 통해 이러한 기능들을 사용할 수 있다.
  + 반응형 포스터 기기의 경우 기기ID, 기기IP, 기기 버전, 기기 설치 위치, 기기 담당자, 기기 상태에 대한 정보를 갖고 있다. 이는 관리 모듈을 통해 데이터베이스에 저장되어 관리된다.
  + 환자 식별기기의 경우 기기ID, 기기 버전, 기기 담당자, 기기 소유자, 기기 상태, 환자 운동량에 대한 정보를 갖고 있다. 이는 관리 모듈을 통해 데이터베이스에 저장되어 관리된다.

3. 의료진 정보 관리 모듈
  + 의료진 계정에 대한 정보를 총괄적으로 관리한다. 등록, 삭제, 수정, 검색을 수행할 수 있으며 관리자는 웹 페이지를 통해 이러한 기능들을 사용할 수 있다.
  + 의료진 계정은 시스템을 이용하는 각 의료진에게 하나씩 발급되며, 각 계정은 환자에 대한 정보를 관리하고 환자에게 식별기기를 지급 및 개통해줄 수 있는 권한을 갖는다.
  + 아이디, 비밀번호, 이름, 사번, 연락처, 생일, 부서(진료과., 직급에 대한 정보를 담고 있으며, 이는 관리 모듈을 통해 데이터베이스에 저장되어 관리된다.

4. 환자 정보 관리 모듈
  + 환자에 대한 정보를 총괄적으로 관리한다. 등록, 삭제, 수정, 검색을 수행할 수 있으며 의료진은 웹 페이지를 통해 이러한 기능들을 사용할 수 있다.
  + 환자에 대한 정보는 환자를 시스템에 등록할 시에 입력하며, 환자의 이름, 환자번호, 병명, 세부상태, 식별기기ID(발급 시., 연락처에 대한 내용을 담고 있다. 이는 관리 모듈을 통해 데이터베이스에 저장되어 관리한다.

5. 기기 개통 모듈
  + 관리자는 등록된 반응형 포스터 기기를 활성화 하기 위해 기기 정보에 담겨있는 IP를 이용하여 연결 여부를 확인하고, 연결이 확인될 시 기기를 개통 처리하여 사용 가능하게 만들 수 있다.
  + 의료진은 환자에게 환자 식별기기를 지급하기 전에 환자 식별기기를 환자에게 등록시키고, 시스템에 기록한 후 개통 과정을 거친 후에 환자에게 지급한다. 환자는 이를 이용하여 환자 운동 서비스를 제공받을 수 있다.

6. 환자 운동 서비스 제공 모듈
  + 반응형 포스터 기기의 요청에 담겨있는 식별ID를 받아 환자에 대한 정보를 검색하고, 결과를 다시 반응형 포스터 기기에 돌려준다. 반응형 포스터 기기는 이를 이용하여 환자를 식별하고, 환자에게 적극적으로 운동을 유도한다.
  + 환자 정보를 전송하며 동시에 환자가 수행해야 할 운동 프로그램의 정보를 전송하여 환자에게 제공할 수 있도록 한다.


# 파일구성

 ![소프트웨어 파일 구조](/Final_project/Docs/Picture/Server_tree.png "소프트웨어 파일 구조")
